import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/product-card';
import ServiceCard from '@/components/service-card';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const products = [
    { name: 'Organic Aloe Vera Gel', price: '$12.99', imageId: 'aloe-vera-gel' },
    { name: 'Turmeric Curcumin Capsules', price: '$19.99', imageId: 'turmeric-capsules' },
    { name: 'Calming Lavender Oil', price: '$15.49', imageId: 'lavender-oil' },
    { name: 'Energizing Ginseng Tea', price: '$9.99', imageId: 'ginseng-tea' },
  ];
  const services = [
    { name: 'Nutritional Counseling', description: 'Personalized diet plans to help you achieve your health goals.', imageId: 'service-nutrition' },
    { name: 'Herbalism Workshops', description: 'Learn about the power of medicinal plants and create your own remedies.', imageId: 'service-herbalism' },
  ];
  const testimonials = [
    { name: 'Sarah L.', quote: "NaturaLife has completely changed my approach to wellness. The products are top-quality and the staff is so knowledgeable!", imageId: 'testimonial-1' },
    { name: 'Mike R.', quote: "The nutritional counseling service was a game-changer for me. I feel more energetic and healthier than ever.", imageId: 'testimonial-2' },
    { name: 'Jessica P.', quote: "I love the AI recommendations! It introduced me to my new favorite tea for relaxation. So cool!", imageId: 'testimonial-3' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            className="object-cover z-0"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="container relative z-20 flex flex-col items-center">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
            Embrace Your Natural Path
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-200">
            Discover pure, effective products and holistic services designed to nurture your body and soul.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Products</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
               <Link href="/services">Book a Service</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const img = PlaceHolderImages.find(p => p.id === product.imageId);
              return img ? <ProductCard key={product.name} {...product} imageUrl={img.imageUrl} imageHint={img.imageHint} /> : null;
            })}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">Our Holistic Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {services.map((service) => {
              const img = PlaceHolderImages.find(p => p.id === service.imageId);
              return img ? <ServiceCard key={service.name} {...service} imageUrl={img.imageUrl} imageHint={img.imageHint} /> : null;
            })}
          </div>
           <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">Explore All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

    

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <h2 className="font-headline text-4xl md:text-5xl text-center mb-4">What Our Community Says</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">We're proud to have helped so many on their wellness journey.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => {
              const img = PlaceHolderImages.find(p => p.id === testimonial.imageId);
              return (
                <Card key={testimonial.name} className="flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      {img && <Avatar>
                        <AvatarImage src={img.imageUrl} alt={testimonial.name} data-ai-hint={img.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>}
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <div className="flex text-secondary">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic flex-grow">&quot;{testimonial.quote}&quot;</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
