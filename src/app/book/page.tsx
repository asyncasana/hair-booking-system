"use client";

import { Suspense } from "react";
import BookingForm from "@/app/_components/BookingForm"; // adjust path if needed

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <BookingForm />
    </Suspense>
  );
}