import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 items-start">
            <Logo />
            <p className="text-muted-foreground text-sm">Your sanctuary for natural products and holistic services.</p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary">Products</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/locations" className="text-sm text-muted-foreground hover:text-primary">Locations</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Natural healt center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
