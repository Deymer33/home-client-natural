import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  name: string;
  price: string;
  imageUrl: string;
  imageHint: string;
};

export default function ProductCard({ name, price, imageUrl, imageHint }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl">
      <div className="p-0">
        <div className="aspect-square relative">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            data-ai-hint={imageHint}
          />
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-headline text-lg font-semibold">{name}</h3>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{price}</p>
        <Button size="icon" variant="secondary">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
