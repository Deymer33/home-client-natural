import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/product-card';

export default function ProductsPage() {
    const products = [
        { name: 'Organic Aloe Vera Gel', price: '$12.99', imageId: 'aloe-vera-gel' },
        { name: 'Turmeric Curcumin Capsules', price: '$19.99', imageId: 'turmeric-capsules' },
        { name: 'Calming Lavender Oil', price: '$15.49', imageId: 'lavender-oil' },
        { name: 'Energizing Ginseng Tea', price: '$9.99', imageId: 'ginseng-tea' },
    ];
    return (
        <div className="container py-12">
            <h1 className="font-headline text-5xl mb-8 text-center">Our Products</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => {
                  const img = PlaceHolderImages.find(p => p.id === product.imageId);
                  return img ? <ProductCard key={product.name} {...product} imageUrl={img.imageUrl} imageHint={img.imageHint} /> : null;
                })}
            </div>
        </div>
    );
}
