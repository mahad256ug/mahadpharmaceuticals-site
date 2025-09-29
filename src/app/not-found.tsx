// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[66vh] px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl mb-6">Page Not Found</h2>
      <p className="mb-8 text-center max-w-md px-7">
        The page you are looking for doesn&apos;t exist or has been moved.
        Please check the URL or go back to the homepage.
      </p>
      <Link
        href="/"
        className="px-6 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
