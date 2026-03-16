"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-black tracking-tighter text-zinc-900 dark:text-white">
          Travel <span className="text-blue-600">Journal</span>
        </h1>
        <p className="mb-10 text-lg text-zinc-600 dark:text-zinc-550">
          陪伴您規劃每一場冒險，珍藏旅途中每一段美好回憶。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-white border border-zinc-200 px-10 py-4 text-lg font-bold text-zinc-900 transition-all hover:bg-zinc-100 active:scale-95 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-800"
          >
            Register
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-8 text-sm text-zinc-400">
        © 2026 Travel Journal Project by Timothy
      </footer>
    </main>
  );
}
