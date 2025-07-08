'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceCard from '../_components/ServiceCard';

type Service = {
  id: number;
  name: string;
  image?: string;
  description?: string;
  price?: number;
  category?: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    fetch('/api/services')
      .then((res) => res.json())
      .then(setServices);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white pt-12">
      <h1
        className="text-4xl font-bold mb-8 text-[#c83589]"
        data-aos="fade-down"
      >
        Our Services
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-5xl px-4"
        data-aos="fade-up"
      >
        {services.map((service) => (
          <ServiceCard
            id={Number(service.id)}
            key={service.id}
            image={service.image || '/images/contact-bg.jpg'}
            title={service.name}
            description={service.description ?? ''}
            price={service.price}
            category={service.category ?? ''}
          />
        ))}
      </div>

      {/* Add some bottom margin so the footer doesn’t stick */}
      <div className="h-16" />
    </div>
  );
}
