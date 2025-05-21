"use client";

import { useState, useRef } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import ContactForm from "@/app/_components/ContactForm";

export default function AccountPage() {
  const { data: session } = useSession();

  // State for uploaded image and edit mode
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);

  // Account info state for editing
  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
      setEditingImage(false);
      // TODO: Upload to DB here
    }
  };

  // If user is not logged in, show login prompt
  if (!session) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img
          src="/images/hero-image.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          draggable={false}
        />
        <div className="relative z-10 p-8 bg-white/80 rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-[#c83589] text-center">
            Login to manage your account
          </h2>
          <button
            className="bg-[#c83589] text-white rounded px-4 py-2 font-semibold hover:bg-[#ff77a4]"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  // Decide which image to show
  //   const profileImage =
  //     uploadedImage || session.user?.image || "/images/user-placeholder.jpg";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-12">
      <h1 className="text-3xl font-bold mb-4 text-[#c83589]">Account Page</h1>
      {/* Profile Picture with Edit Overlay */}
      <div
        className="relative group mb-4 cursor-pointer"
        onClick={() => setEditingImage(true)}
        onMouseEnter={() => setEditingImage(true)}
        onMouseLeave={() => setEditingImage(false)}
        style={{ width: 96, height: 96 }}
      >
        <img
          src="/images/user-placeholder.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#c83589] transition"
          draggable={false}
        />
        {/* Overlay */}
        {editingImage && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
            <button
              className="text-white font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Edit
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        )}
        {uploadedImage && (
          <button
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-[#c83589] border border-[#c83589] rounded-full px-3 py-1 text-xs shadow hover:bg-[#ffe4f3] transition"
            style={{ zIndex: 20 }}
            onClick={() => setUploadedImage(null)}
            type="button"
          >
            Remove
          </button>
        )}
      </div>

      {/* Account Info */}
      {!editingInfo ? (
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center mb-4 w-full max-w-sm">
          <div className="mb-2">
            <span className="font-semibold">Name: </span>
            {name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email: </span>
            {session.user?.email}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Phone: </span>
            {phone || <span className="text-gray-400">Not set</span>}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-[#c83589] text-white rounded px-4 py-2 font-semibold hover:bg-[#ff77a4]"
              onClick={() => setEditingInfo(true)}
            >
              Manage Account
            </button>
            <button
              className="bg-gray-300 text-gray-600 rounded px-4 py-2 font-semibold cursor-not-allowed"
              disabled
            >
              Manage Bookings
            </button>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4 max-w-sm w-full bg-white p-6 rounded-xl shadow mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            setEditingInfo(false);
            // TODO: Save changes to DB here
          }}
        >
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full rounded border px-3 py-2"
            />
          </label>
          <button className="bg-[#c83589] text-white rounded py-2 font-semibold hover:bg-[#ff77a4]">
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-600 rounded py-2 font-semibold mt-2"
            onClick={() => setEditingInfo(false)}
          >
            Cancel
          </button>
        </form>
      )}

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
      <div className="mt-12 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
