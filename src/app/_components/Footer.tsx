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
          href="https://www.instagram.com/hairwithiryna?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-300 transition"
        >
          <svg
            width={26}
            height={26}
          viewBox="0 0 24 24"
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
  href="https://wa.me/447909901518" 
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-pink-300 transition"
  aria-label="WhatsApp"
>
  {/* WhatsApp SVG */}
 <svg
    width={26}
    height={24}
    viewBox="0 0 30 30"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.59-1.72c1.87 1.02 3.98 1.56 6.21 1.56h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-2.01 0-3.98-.54-5.68-1.56l-.41-.24-3.91 1.02 1.04-3.81-.27-.39c-1.09-1.6-1.67-3.47-1.67-5.41 0-5.41 4.41-9.82 9.82-9.82s9.82 4.41 9.82 9.82-4.41 9.82-9.82 9.82zm5.39-7.43c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5-.17-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.43.01 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.07 4.87 4.19.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z"/>
    </g>
  </svg>
</a>
      </div>
    </footer>
  );
}
