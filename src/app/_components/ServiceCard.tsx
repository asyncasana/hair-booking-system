import Image from "next/image";
import Link from "next/link";

type ServiceBreakdown = {
  label: string;
  price: string;
};

type ServiceCardProps = {
  image: string;
  title: string;
  description: string;
  breakdown: ServiceBreakdown[];
};

export default function ServiceCard({
  image,
  title,
  description,
  breakdown,
}: ServiceCardProps) {
  return (
    <div className="rounded-xl shadow-lg bg-[#fbeaf3] p-0 flex flex-col items-center overflow-hidden relative">
      {/* Banner background with text overlay */}
      <div className="relative w-full h-32 flex items-center justify-center">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover brightness-75"
          draggable={false}
        />
        {/* Pink hue overlay */}
        <div className="absolute inset-0 bg-pink-300/60 z-10" />
        <div className="relative z-20 w-full px-4 text-center">
          <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
          <p className="text-white mb-2 text-sm">{description}</p>
        </div>
      </div>
      {/* Price rows */}
      <div className="flex flex-col gap-2 w-full px-4 py-4 bg-[#fbeaf3] z-10 relative">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between w-full">
            <span className="text-sm">{item.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#c83589]">
                {item.price}
              </span>
              <Link
                href={{
                  pathname: "/book",
                  query: {
                    service: title,
                    option: item.label,
                    price: item.price,
                  },
                }}
                className="rounded-full bg-[#c83589] px-5 py-2 text-white font-semibold hover:bg-[#ff77a4] transition text-xs ml-2"
              >
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
