import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
