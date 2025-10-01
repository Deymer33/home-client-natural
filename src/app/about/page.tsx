import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

    return (
        <div>
            <div className="relative h-64 w-full">
                 {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt="Lush green foliage"
                        fill
                        className="object-cover"
                        data-ai-hint={heroImage.imageHint}
                    />
                )}
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center" />
                 <h1 className="absolute inset-0 flex items-center justify-center font-headline text-6xl text-white">About Us</h1>
            </div>
            <div className="container py-12 max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground mb-6">
                    NaturaLife was founded on a simple principle: nature provides the best ingredients for a healthy and vibrant life. Our journey began with a passion for herbal remedies and a desire to share their benefits with our community.
                </p>
                <p className="text-lg text-muted-foreground">
                    Today, with locations in California and Mexico, we continue to source the highest quality organic products and offer holistic services that honor the connection between mind, body, and nature. We believe in sustainability, transparency, and the power of natural wellness to transform lives.
                </p>
            </div>
        </div>
    );
}
