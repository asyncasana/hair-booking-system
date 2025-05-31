"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieAccepted")) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between z-50">
      <span>
        This website uses cookies to enhance your experience. By using our site, you agree to our{" "}
        <a href="/privacy" className="underline text-pink-300 hover:text-pink-400">Privacy Policy</a>.
      </span>
      <button
        onClick={acceptCookies}
        className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-[#c83589] rounded text-white hover:bg-[#ff77a4] transition"
      >
        Accept
      </button>
    </div>
  );
}