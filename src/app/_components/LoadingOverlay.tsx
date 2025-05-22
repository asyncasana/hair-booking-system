"use client";

export default function LoadingOverlay() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <img
          src="/images/hero-image.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          draggable={false}
        />
        <div className="text-[#c83589] text-xl font-semibold">Loading...</div>
      </div>
    );
  }