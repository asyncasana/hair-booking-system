"use client";

import ServiceCard from "../_components/ServiceCard";
import ContactForm from "../_components/ContactForm";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-12">
      <h1 className="text-4xl font-bold mb-8 text-[#c83589]">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
        <ServiceCard
          image="/images/service-haircut.jpg"
          title="Haircuts"
          description="Precision cuts tailored to your style, hair type, and face shape. Includes wash, cut, and blow dry."
          breakdown={[
            { label: "Women's Short Hair", price: "£40" },
            { label: "Women's Long Hair", price: "£50" },
            { label: "Children's Haircut", price: "£25" },
          ]}
        />
        <ServiceCard
          image="/images/service-styling.jpg"
          title="Styling"
          description="Blow dry, curls, updos, and more for any occasion."
          breakdown={[
            { label: "Blow Dry Short Hair", price: "£15" },
            { label: "Blow Dry Long Hair", price: "£20" },
            { label: "Curl or Straighten", price: "£12" },
            { label: "Hair Up", price: "from £25" },
          ]}
        />
        <ServiceCard
          image="/images/service-colour.jpg"
          title="Full Colour"
          description="Transform your look with a full head of colour. Includes consultation and aftercare advice. All products used are cruelty-free."
          breakdown={[
            { label: "Short Hair", price: "£30" },
            { label: "Long Hair", price: "£35" },
            { label: "Root Touchup", price: "£25" },
            { label: "Toner", price: "from £5" },
          ]}
        />
        <ServiceCard
          image="/images/service-highlights.jpg"
          title="Highlights"
          description="Freshen up your hair with our expert highlights. Choose from full, partial, or balayage techniques."
          breakdown={[
            { label: "T-Section", price: "£25" },
            { label: "Half Head", price: "from £35" },
            { label: "Full Head", price: "from £50" },
            { label: "Balayage", price: "from £70" },
          ]}
        />
      </div>
        <div className="mt-12 w-full">
            <ContactForm />
      </div>
    </div>
  );
}
