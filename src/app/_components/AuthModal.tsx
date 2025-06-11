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
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only for register
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(""); // For register

  if (!open) return null;

  // Handle custom login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/account",
    });
    setLoading(false);
    if (res?.error) setError("Invalid email or password");
    else onClose();
  };

  // Handle password reset
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resetEmail }),
    });
    setLoading(false);
    if (res.ok) {
      setResetSent(true);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to send reset email");
    }
  };

  // Handle custom registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    setLoading(false);
    if (res.ok) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/account",
      });
      onClose();
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 opacity-100"
        onClick={onClose}
        aria-label="Close modal overlay"
      />
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
          Sign in with Google
        </button>

        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {!showEmailForm ? (
          <button
            className="text-sm text-[#c83589] underline mb-2"
            onClick={() => setShowEmailForm(true)}
          >
            Or register / login with email
          </button>
        ) : showForgot ? (
          <form
            className="w-full flex flex-col gap-3 mt-2"
            onSubmit={handleForgot}
          >
            <label
              htmlFor="resetEmail"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Enter your email to reset password
            </label>
            <input
              id="resetEmail"
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#c83589] transition text-gray-900 bg-white"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {resetSent ? (
              <div className="text-green-600 text-sm">
                If that email exists, a reset link has been sent.
              </div>
            ) : (
              <button
                className="w-full rounded bg-[#c83589] text-white py-2 font-semibold hover:bg-[#ff77a4] transition mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            )}
            <button
              type="button"
              className="text-xs text-[#c83589] underline mt-2"
              onClick={() => {
                setShowForgot(false);
                setResetSent(false);
                setError("");
              }}
            >
              Back to login
            </button>
          </form>
        ) : (
          <>
            <form
              className="w-full flex flex-col gap-3 mt-2"
              onSubmit={mode === "login" ? handleLogin : handleRegister}
            >
              {mode === "register" && (
                <div className="flex flex-col items-start">
                  <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#c83589] transition text-gray-900 bg-white"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#c83589] transition text-gray-900 bg-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col items-start relative w-full">
                <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#c83589] transition text-gray-900 bg-white pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-xs text-[#c83589] hover:underline focus:outline-none"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {mode === "register" && (
                <div className="flex flex-col items-start">
                  <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#c83589] transition text-gray-900 bg-white"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                className="w-full rounded bg-[#c83589] text-white py-2 font-semibold hover:bg-[#ff77a4] transition mt-2"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? mode === "login"
                    ? "Logging in..."
                    : "Registering..."
                  : mode === "login"
                  ? "Login"
                  : "Register"}
              </button>
              {mode === "login" && (
                <button
                  type="button"
                  className="text-xs text-[#c83589] underline mt-2 self-end"
                  onClick={() => {
                    setShowForgot(true);
                    setError("");
                  }}
                >
                  Forgot password?
                </button>
              )}
            </form>
            <p className="mt-4 text-sm text-gray-500">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    className="text-[#c83589] underline"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    className="text-[#c83589] underline"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </div>
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