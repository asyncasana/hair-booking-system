import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  price?: number;
  category?: string;
};

export default function ServiceCard({
  id,
  image,
  title,
  description,
  price,
  category,
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
      {/* Price and Book button */}
      <div className="flex flex-col items-center w-full px-4 py-4 bg-[#fbeaf3] z-10 relative">
        <div className="text-xs text-[#c83589] mb-1">{category}</div>
        <span className="text-base font-bold text-[#c83589] mb-2">
          £{price ?? "—"}
        </span>
        <Link
          href={{
            pathname: "/book",
            query: { service: id },
          }}
          className="rounded-full bg-[#c83589] px-5 py-2 text-white font-semibold hover:bg-[#ff77a4] transition text-xs"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
