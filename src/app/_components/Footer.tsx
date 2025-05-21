import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6 bg-[#c83589] text-sm text-white">
      <div>&copy; {currentYear} Hair with Iryna</div>
      <div className="flex gap-6">
        <Link href="/terms" className="hover:text-pink-300 transition">
          Terms & Conditions
        </Link>
        <Link href="/privacy" className="hover:text-pink-300 transition">
          Privacy Policy
        </Link>
      </div>
      <div className="flex gap-4">
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-300 transition"
        >
          <svg
            width={22}
            height={22}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="2" y="2" width="18" height="18" rx="5" />
            <circle cx="11" cy="11" r="4" />
            <circle cx="17" cy="7" r="1.5" />
          </svg>
        </a>
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-300 transition"
        >
          <svg
            width={22}
            height={22}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="2" y="2" width="18" height="18" rx="5" />
            <path d="M14 8h-2a2 2 0 0 0-2 2v2h2v4h2v-4h2v-2h-2V10a1 1 0 0 1 1-1h1V8z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
