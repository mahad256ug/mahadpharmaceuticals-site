"use client";

import React, { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Spinner from "../Spinner";
import { useStoreContext } from "@/store/context";
import SectionHead from "../Animations/SectionHead";

const LoginForm = () => {
  const { isAuthenticated, setIsAuthenticated } = useStoreContext();

  const router = useRouter();

  const searchParams = useSearchParams();
  const login = searchParams.get("login");

  const [secretCode, setSecretCode] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const [secretCodeErr, setSecretCodeErr] = useState<string>("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setSecretCodeErr("");

    if (secretCode && secretCode !== "") {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ secret_code: secretCode }),
      });

      const resStatus = await res.status;

      if (res.ok) {
        const { success } = await res.json();
        if (success && success === true) {
          setIsAuthenticated(true);
        }
      } else {
        if (resStatus === 429) {
          setSecretCode("Rate limit exceeded. Try again later");
          setSecretCodeErr("Rate limit exceeded. Try again later");
        } else {
          setSecretCodeErr("Failed to login. Wrong secret");
        }
      }
    }

    setIsLoading(false);
  }

  return (
    <AnimatePresence>
      {login === "true" && !isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50"
        >
          <div
            onClick={() => router.push("?login=false")}
            className="fixed top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          <div className="bg-white p-10 py-12 max-w-xl m-auto w-full z-10 relative">
            <div>
              <div>
                <SectionHead
                  title="Enter the Secret please."
                  subtitle="You have only 3 chances for 6 hours. Be carefull"
                />

                <div>
                  <form onSubmit={(e) => onSubmit(e)} method="post">
                    <input
                      type="text"
                      className="form-input"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      placeholder="Enter secret"
                    />
                    {secretCodeErr && (
                      <>
                        <div className="w-full text-red-500 text-sm mt-2 pl-2">
                          <p className="text-current">{secretCodeErr}</p>
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      className="border border-green-500 py-3 w-full text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out mt-8"
                    >
                      <p className="text-current">Login</p>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {loading && (
              <div className="absolute top-0 left-0 h-full w-full bg-white/60 flex items-center justify-center">
                <div className="h-8 w-8">
                  <Spinner className="fill-black" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
