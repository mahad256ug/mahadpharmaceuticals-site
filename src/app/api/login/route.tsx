import { Redis } from "@upstash/redis";
import { setCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { NextResponse } from "next/server";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT = 2; // requests
const WINDOW = 1 * 60; // 30 minutes in seconds TODO

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const { secret_code } = await req.json();

    // Key for this IP
    const key = `throttle:${ip}`;

    // Get current attempts
    let attempts = await redis.get<number[]>(key);
    if (!attempts) attempts = [];

    const now = Math.floor(Date.now() / 1000);

    // Remove old attempts outside the window
    attempts = attempts.filter((ts) => now - ts < WINDOW);

    if (attempts.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }

    // Log this attempt
    attempts.push(now);
    await redis.set(key, attempts, { ex: WINDOW });

    // Check secret code
    if (safeCompare(secret_code, SECRET_CODE)) {
      console.log("secret match");
      await setCookie("auth", secret_code, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      return NextResponse.json(
        { success: true, key: secret_code },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, key: secret_code },
      { status: 400 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
