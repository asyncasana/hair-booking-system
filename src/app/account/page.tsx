"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/app/_components/LoadingOverlay";
import imageCompression from "browser-image-compression";

export default function AccountPage() {
  const { data: session, status } = useSession();

  // State for uploaded image and edit mode
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState(false);
  const [editingInfo, setEditingInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);

  // Account info state for editing
  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageUpload called", e.target.files);

    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: 256,
        maxSizeMB: 0.1,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onload = async (ev) => {
        const base64 = ev.target?.result as string;
        setUploadedImage(base64);

        console.log("Uploading image to DB...");
        const res = await fetch("/api/account", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, image: base64 }),
        });
        console.log("Upload response:", res.status);
        if (res.ok) {
          setImageSuccess(true); // Show confirmation
          fetchUser(); // Refresh user data
        } else {
          alert("Image upload failed.");
        }
      };
      reader.readAsDataURL(compressedFile);
    }
    setEditingImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fetchUser = async () => {
    const res = await fetch("/api/account");
    const data = await res.json();
    if (data.user) {
      setName(data.user.name || "");
      setPhone(data.user.phone || "");
      setUploadedImage(data.user.image || null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (status === "loading") {
    return <LoadingOverlay />;
  }

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
  const profileImage =
    uploadedImage || session.user?.image || "/images/user-placeholder.jpg";

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
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#c83589] transition"
          draggable={false}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }} // Use style instead of className="hidden"
          onChange={handleImageUpload}
        />
        {/* Overlay */}
        {editingImage && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
            <button
              className="text-white font-semibold"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {imageSuccess && (
        <div className="text-green-600 font-semibold mt-2">
          Profile image updated!
        </div>
      )}

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
              className="bg-[#c83589] text-white rounded px-4 py-2 font-semibold hover:bg-[#ff77a4]"
              onClick={() => router.push("/account/bookings")}
            >
              Manage Bookings
            </button>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col gap-4 max-w-sm w-full bg-white p-6 rounded-xl shadow mb-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch("/api/account", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, phone }),
            });
            setEditingInfo(false);
            setSuccess(true);
            fetchUser(); // Refetch user data
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
    </div>
  );
}
