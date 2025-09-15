"use client";

import Link from "next/link";
import React, { Suspense } from "react";

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-[66vh] bg-gray-50 px-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md px-7">
          The page you are looking for doesn&apos;t exist or has been moved.
          Please check the URL or go back to the homepage.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded shadow-md transition"
        >
          Go to Homepage
        </Link>
      </div>
    </Suspense>
  );
}
