import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function NotFound() {
  useEffect(() => {
    document.title = "Imagine House | Error 404";
  }, []);
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-primary tracking-tighter sm:text-5xl animate-bounce">
              Error 404
            </h1>
            <p className="text-gray-500">
              Sepertinya Anda telah menjelajah ke dunia digital yang tidak
              dikenal.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex h-10 items-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaty-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-primary dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 z-10"
            prefetch={undefined}
          >
            Kembali ke Website
          </Link>
        </div>
      </div>
    </BackgroundLines>
  );
}
