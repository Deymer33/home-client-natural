import { services } from "@/data/services";
import { getImageById } from "@/lib/placeholder-images";
import Image from "next/image";
import BookingForm from "@/components/booking-form";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <div className="container py-16">Servicio no encontrado</div>;
  }

  const image = getImageById(service.imageId);

  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {image && (
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover rounded-lg shadow-md"
              priority
            />
          </div>
        )}

        <div>
          <h1 className="font-headline text-4xl mb-4">{service.name}</h1>
          <p className="text-lg text-muted-foreground mb-8">{service.description}</p>

          <BookingForm serviceName={service.name} />
        </div>
      </div>
    </div>
  );
}
