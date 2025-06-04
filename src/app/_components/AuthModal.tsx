"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with fade-in */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-100"
        onClick={onClose}
        aria-label="Close modal overlay"
      />
      {/* Modal with scale/opacity animation */}
      <div
        className="relative z-10 bg-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center text-center transition-all duration-300 transform scale-100 opacity-100"
        style={{ animation: "modalPopIn 0.3s" }}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-[#c83589]">
          {mode === "login" ? "Login" : "Register"}
        </h2>
        <button
          className="w-full mb-4 rounded bg-[#c83589] text-white py-2 font-semibold hover:bg-[#ff77a4] transition"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/account",
              prompt: "select_account login",
            })
          }
          type="button"
        >
          {mode === "login" ? "Sign in with Google" : "Register with Google"}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                className="text-[#c83589] underline"
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-[#c83589] underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
      {/* Optional: Add keyframes for pop-in */}
      <style jsx global>{`
        @keyframes modalPopIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
