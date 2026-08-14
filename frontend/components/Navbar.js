"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/items", label: "Buyumlar" },
  { href: "/points", label: "Punktlar" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/80 backdrop-blur dark:border-emerald-900/40 dark:bg-[#0c1712]/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-emerald-800 dark:text-emerald-200">
          <span className="text-2xl">🌱</span>
          Eco Tashkent
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-emerald-900/80 transition hover:bg-emerald-50 hover:text-emerald-900 dark:text-emerald-100/80 dark:hover:bg-emerald-900/30"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/items/new"
            className="ml-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            + Buyum qo&apos;shish
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 text-emerald-800 sm:hidden dark:border-emerald-800 dark:text-emerald-200"
          aria-label="Menyu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-emerald-100 bg-white px-4 py-3 sm:hidden dark:border-emerald-900/40 dark:bg-[#0c1712]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-900/80 hover:bg-emerald-50 dark:text-emerald-100/80 dark:hover:bg-emerald-900/30"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/items/new"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white"
          >
            + Buyum qo&apos;shish
          </Link>
        </nav>
      )}
    </header>
  );
}
