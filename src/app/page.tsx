import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/product-card';
import ServiceCard from '@/components/service-card';
import AiRecommendations from '@/components/ai-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Star, Leaf, Heart, BookOpen, Sun, Wind, Droplets, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-pro-health');
  const services = [
    { name: 'Examen de Sangre Viva', description: 'Análisis profundo para un diagnóstico preventivo.', imageId: 'service-blood-test' },
    { name: 'Fisioterapia y Terapia Vital', description: 'Restauración integral que combina técnicas tradicionales y naturales.', imageId: 'service-physiotherapy' },
    { name: 'Hidroterapia', description: 'El poder curativo del agua para estimular la circulación y eliminar toxinas.', imageId: 'service-hydrotherapy' },
    { name: 'Medicina Biológica', description: 'Terapias biológicas para la restauración de la salud.', imageId: 'service-biological-medicine'},
    { name: 'Consultas Nutricionales', description: 'Planes de alimentación personalizados para tus objetivos.', imageId: 'service-nutrition' },
    { name: 'Alimentación Terapéutica', description: 'Platos veganos equilibrados con ingredientes frescos y naturales.', imageId: 'service-herbalism' },
    { name: 'Medicamentos Naturales', description: 'Productos 100% naturales, desde hierbas hasta fórmulas personalizadas.', imageId: 'service-natural-meds'},
    { name: 'Terapias Intravenosas', description: 'Nutrientes y vitaminas administrados directamente para una absorción completa.', imageId: 'service-iv-therapy' },
  ];
  const programs = [
    { name: 'Básico', duration: '21 días', price: '$70/día', description: 'Desintoxicación profunda.', accommodation: 'Habitación compartida' },
    { name: 'Plena Salud', duration: '21 días', price: '$100/día', description: 'Salud total.', accommodation: 'Habitación compartida' },
    { name: 'Regeneración Total', duration: '21 días', price: '$140/día', description: 'Fortalecimiento inmunológico.', accommodation: 'Habitación privada' },
    { name: 'Limpieza Hepática', duration: '7 días', price: '$95/día', description: 'Detox recomendado 2 veces al año.', accommodation: 'Habitación compartida' },
    { name: 'Spa One Day', duration: '1 día', price: '$165', description: 'Programa intensivo de descanso.', accommodation: 'Habitación privada' },
  ];
  const whyChooseUs = [
      { title: 'Causas, no Síntomas', description: 'Tratamos el origen del desequilibrio para una sanidad real y duradera.' },
      { title: 'Natural y Seguro', description: 'Métodos 100% naturales, eficaces y libres de químicos dañinos para el cuerpo.' },
      { title: 'Poder Sanador', description: 'Creemos que Dios es la fuente de toda sanidad y restauración.' },
      { title: 'Testimonios Reales', description: 'Historias de recuperación que inspiran y dan esperanza.' },
  ];
  const healthLaws = [
      { name: 'Agua', icon: <Droplets className="h-12 w-12 text-primary"/> },
      { name: 'Descanso', icon: <Star className="h-12 w-12 text-primary"/> },
      { name: 'Ejercicio', icon: <Heart className="h-12 w-12 text-primary"/> },
      { name: 'Luz Solar', icon: <Sun className="h-12 w-12 text-primary"/> },
      { name: 'Aire Puro', icon: <Wind className="h-12 w-12 text-primary"/> },
      { name: 'Nutrición', icon: <Leaf className="h-12 w-12 text-primary"/> },
      { name: 'Temperancia', icon: <BookOpen className="h-12 w-12 text-primary"/> },
      { name: 'Esperanza', icon: <Star className="h-12 w-12 text-primary"/> },
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

      {/* Quienes Somos Section */}
        <section className="relative py-20 md:py-32">
            <div className="absolute inset-0 z-0">
                <Image src="https://picsum.photos/seed/30/1200/800" alt="Spa background" fill className="object-cover opacity-10" data-ai-hint="spa background" />
                <div className="absolute inset-0 bg-background/80"></div>
            </div>
            <div className="container relative z-10 text-center">
                <h2 className="font-headline text-4xl md:text-5xl text-primary mb-4">Pro Health Natural Center</h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">Centro de vida sana y medicina natural dedicado a la restauración integral del ser humano.</p>
                <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">Creemos que la verdadera salud nace de la armonía entre cuerpo, mente y espíritu, y que su fuente es Dios, el Autor de la vida.</p>
            </div>
        </section>

      {/* Misión, Visión y Valores */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center">
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                <div>
                    <h3 className="font-headline text-3xl text-primary mb-4">Misión</h3>
                    <p className="text-muted-foreground text-lg">Promover la restauración integral del ser humano mediante programas naturales, educación para la salud y acompañamiento espiritual.</p>
                </div>
                <div>
                    <h3 className="font-headline text-3xl text-primary mb-4">Visión</h3>
                    <p className="text-muted-foreground text-lg">Ser un centro de referencia en medicina natural, reconocido por su enfoque humano, espiritual y científico.</p>
                </div>
            </div>
            <h3 className="font-headline text-4xl text-center mb-12">Nuestros Valores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                <Card className="text-center group hover:border-primary transition-all">
                    <CardContent className="p-6">
                        <Heart className="mx-auto h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110"/>
                        <CardTitle className="font-headline text-xl">Fe en Dios</CardTitle>
                    </CardContent>
                </Card>
                <Card className="text-center group hover:border-primary transition-all">
                    <CardContent className="p-6">
                        <Leaf className="mx-auto h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110"/>
                        <CardTitle className="font-headline text-xl">Amor y Servicio</CardTitle>
                    </CardContent>
                </Card>
                <Card className="text-center group hover:border-primary transition-all">
                    <CardContent className="p-6">
                        <BookOpen className="mx-auto h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110"/>
                        <CardTitle className="font-headline text-xl">Educación</CardTitle>
                    </CardContent>
                </Card>
                <Card className="text-center group hover:border-primary transition-all">
                    <CardContent className="p-6">
                        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110"/>
                        <CardTitle className="font-headline text-xl">Naturalidad</CardTitle>
                    </CardContent>
                </Card>
                <Card className="text-center group hover:border-primary transition-all">
                    <CardContent className="p-6">
                        <Star className="mx-auto h-12 w-12 text-primary mb-4 transition-transform group-hover:scale-110"/>
                        <CardTitle className="font-headline text-xl">Esperanza</CardTitle>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-16 md:py-24">
          <div className="container">
              <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">Nuestros Servicios</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {services.map((service) => {
                      const img = PlaceHolderImages.find(p => p.id === service.imageId);
                      return (
                          <Card key={service.name} className="overflow-hidden group flex flex-col">
                              <div className="relative aspect-square">
                                  {img && <Image src={img.imageUrl} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={img.imageHint} />}
                              </div>
                              <CardContent className="p-4 flex-grow">
                                  <CardTitle className="font-headline text-lg">{service.name}</CardTitle>
                                  <p className="text-sm text-muted-foreground mt-2">{service.description}</p>
                              </CardContent>
                              <CardFooter className="p-4 pt-0">
                                  <Button variant="outline" size="sm">Ver más</Button>
                              </CardFooter>
                          </Card>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* Programas y Paquetes Section */}
      <section className="py-16 md:py-24 bg-card">
          <div className="container">
              <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">Programas y Paquetes</h2>
              <Carousel className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto">
                  <CarouselContent>
                      {programs.map((program) => (
                          <CarouselItem key={program.name} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                  <Card className="flex flex-col h-full">
                                      <CardHeader>
                                          <CardTitle className="font-headline">{program.name}</CardTitle>
                                          <div className="text-2xl font-bold text-primary">{program.price}</div>
                                          <div className="text-sm text-muted-foreground">{program.duration}</div>
                                      </CardHeader>
                                      <CardContent className="flex-grow">
                                          <p>{program.description}</p>
                                          <p className="text-sm text-muted-foreground mt-2">{program.accommodation}</p>
                                      </CardContent>
                                  </Card>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
              </Carousel>
          </div>
      </section>
      
      {/* Por qué elegirnos */}
        <section className="py-16 md:py-24">
            <div className="container">
                <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">¿Por qué elegirnos?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {whyChooseUs.map((reason, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="p-6">
                                <Leaf className="h-10 w-10 mx-auto text-secondary mb-4"/>
                                <h3 className="font-headline text-xl mb-2">{reason.title}</h3>
                                <p className="text-muted-foreground text-sm">{reason.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      {/* Leyes de la Salud */}
      <section className="py-16 md:py-24 bg-card">
            <div className="container">
                <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">Las 8 Leyes de la Salud</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 text-center">
                    {healthLaws.map(law => (
                        <div key={law.name} className="flex flex-col items-center gap-2 group">
                            <div className="bg-background p-4 rounded-full group-hover:bg-primary/10 transition-colors">
                                {law.icon}
                            </div>
                            <p className="font-headline text-lg">{law.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      {/* Contacto y Ubicación */}
        <section className="py-16 md:py-24">
            <div className="container">
                <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">Contacto y Ubicación</h2>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h3 className="font-headline text-2xl mb-4">Ponte en contacto</h3>
                        <p className="text-muted-foreground mb-6">
                            Estamos aquí para ayudarte en tu camino hacia una vida más saludable.
                        </p>
                        <div className="space-y-4 text-foreground">
                            <p><strong>Dirección:</strong> El Aguaje, Municipio de Emiliano Zapata, Veracruz.</p>
                            <p><strong>Teléfonos:</strong> +52 279-834-0314 / +52 937-140-8565</p>
                            <p><strong>WhatsApp (US):</strong> +1 818 565 9495</p>
                            <p><strong>Correo:</strong> prohealthnaturalcenter@gmail.com</p>
                        </div>
                        <Button asChild className="mt-6">
                            <a href="https://www.facebook.com/ProHealthNatural" target="_blank" rel="noopener noreferrer">
                                Síguenos en Facebook
                            </a>
                        </Button>
                        <div className="mt-8">
                            <h3 className="font-headline text-2xl mb-4">Envíanos un mensaje</h3>
                             <form className="space-y-4">
                                <Input placeholder="Nombre" />
                                <Input type="email" placeholder="Correo electrónico" />
                                <Textarea placeholder="Tu mensaje" />
                                <Button type="submit">Enviar Mensaje</Button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                             <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.328393539071!2d-96.7618386850942!3d19.4851499868551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85db3e4b85555555%3A0x5535555555555555!2sPro%20Health%20Natural%20Center!5e0!3m2!1sen!2smx!4v1628896939589!5m2!1sen!2smx" 
                                width="100%" 
                                height="100%" 
                                style={{border:0}} 
                                allowFullScreen={true}
                                loading="lazy"
                                title="Google Map of Pro Health Natural Center"
                                >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
