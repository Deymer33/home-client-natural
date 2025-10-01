import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type ServiceCardProps = {
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export default function ServiceCard({ name, description, imageUrl, imageHint }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden group flex flex-col">
      <div className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={imageHint}
          />
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" asChild>
          <Link href="/services">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
