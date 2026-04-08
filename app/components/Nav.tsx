"use client";

import Link from "next/link";
import { useState } from "react";
import LloydAvatar from "./LloydAvatar";

const links = [
  { href: "/", label: "Home" },
  { href: "/meet-lloyd", label: "Meet Lloyd" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/chapter-dna", label: "Chapter DNA" },
  { href: "/pricing", label: "Pricing" },
  { href: "/chat", label: "Ask Lloyd" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-sky-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <LloydAvatar size={36} />
          <span className="text-lg font-extrabold text-slate-800 tracking-tight group-hover:text-sky-600 transition-colors">
            Only Lloyd Knows
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-slate-600 hover:text-sky-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            className="bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded-full hover:bg-amber-300 transition-colors text-sm shadow-sm"
          >
            Get Lloyd — $6/mo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl text-slate-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-sky-100 px-4 pb-4 bg-white">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2.5 text-sm font-semibold text-slate-600 hover:text-sky-600"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            className="block mt-2 bg-amber-400 text-slate-900 font-bold px-4 py-2.5 rounded-full text-center text-sm"
            onClick={() => setOpen(false)}
          >
            Get Lloyd — $6/mo
          </Link>
        </div>
      )}
    </nav>
  );
}
