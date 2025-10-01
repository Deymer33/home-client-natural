import ServiceCard from '@/components/service-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServicesPage() {
    const services = [
        { name: 'Nutritional Counseling', description: 'Personalized diet plans to help you achieve your health goals.', imageId: 'service-nutrition' },
        { name: 'Herbalism Workshops', description: 'Learn about the power of medicinal plants and create your own remedies.', imageId: 'service-herbalism' },
      ];

    return (
        <div className="container py-12">
            <h1 className="font-headline text-5xl mb-8 text-center">Our Services</h1>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
                We offer a range of holistic services in our Mexico and California locations to support your wellness journey from the inside out.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {services.map((service) => {
                const img = PlaceHolderImages.find(p => p.id === service.imageId);
                return img ? <ServiceCard key={service.name} {...service} imageUrl={img.imageUrl} imageHint={img.imageHint} /> : null;
                })}
            </div>
        </div>
    );
}
