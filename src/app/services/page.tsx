import { SERVICES } from "@/app/_data/services";
import ServiceCard from "../_components/ServiceCard";
import ContactForm from "../_components/ContactForm";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-12">
      <h1 className="text-4xl font-bold mb-8 text-[#c83589]">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
        {SERVICES.map(service => (
          <ServiceCard
            key={service.id}
            image={service.image}
            title={service.title}
            description={service.description}
            breakdown={service.breakdown}
          />
        ))}
      </div>
      <div className="mt-12 w-full">
        <ContactForm />
      </div>
    </div>
  );
}