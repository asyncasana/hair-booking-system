"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#c83589] text-white shadow-md relative">
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-2xl font-bold tracking-widest text-white">
            Hair with Iryna
          </span>
        </Link>
      </div>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/services" className="hover:text-pink-300 transition">
          Services
        </Link>
        <Link href="#contact" className="hover:text-pink-300 transition">
          Contact Us
        </Link>
        {session ? (
          <Link
            href="/account"
            className="ml-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
            title="Account"
            aria-label="Account"
          >
            <svg
              width={28}
              height={28}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx={14} cy={10} r={4} />
              <path d="M4 22c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </Link>
        ) : (
          <button
            type="button"
            className="ml-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
            title="Account"
            aria-label="Account"
            onClick={() => setShowAuth(true)}
          >
            <svg
              width={28}
              height={28}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx={14} cy={10} r={4} />
              <path d="M4 22c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </button>
        )}
      </nav>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        <svg
          width={32}
          height={32}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M6 10h20M6 16h20M6 22h20" />
        </svg>
      </button>
      {/* Mobile dropdown */}
      {open && (
        <>
          {/* Overlay: covers the whole screen, closes menu on click */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />
          {/* Dropdown menu */}
          <div className="absolute top-full right-1 mt-2 w-60 rounded-lg bg-[#ffc0e4] text-[#c83589] shadow-lg flex flex-col z-50 md:hidden">
            <Link
              href="/services"
              className="px-6 py-3 hover:bg-pink-300/30 transition flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              {/* Sparkle icon */}
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Services
            </Link>
            <Link
              href="#contact"
              className="px-6 py-3 hover:bg-pink-300/30 transition flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              {/* Phone icon */}
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z" />
              </svg>
              Contact Us
            </Link>
            {session ? (
              <Link
                href="/account"
                className="px-6 py-3 flex items-center gap-2 hover:bg-pink-300/30 transition"
                title="Account"
                aria-label="Account"
                onClick={() => setOpen(false)}
              >
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx={11} cy={8} r={4} />
                  <path d="M3 20c0-4 8-4 8-4s8 0 8 4" />
                </svg>
                Account
              </Link>
            ) : (
              <button
                type="button"
                className="px-6 py-3 flex items-center gap-2 hover:bg-pink-300/30 transition"
                title="Account"
                aria-label="Account"
                onClick={() => {
                  setOpen(false);
                  setShowAuth(true);
                }}
              >
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx={11} cy={8} r={4} />
                  <path d="M3 20c0-4 8-4 8-4s8 0 8 4" />
                </svg>
                Account
              </button>
            )}
          </div>
        </>
      )}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </header>
  );
}
