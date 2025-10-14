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
            <p className="text-muted-foreground text-sm">Centro de vida sana y medicina natural dedicado a la restauración integral del ser humano.</p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary">Productos</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Servicios</Link></li>
              <li><Link href="/locations" className="text-sm text-muted-foreground hover:text-primary">Ubicación</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">Quiénes Somos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>+52 279-834-0314</p>
              <p>+52 937-140-8565</p>
              <p>prohealthnaturalcenter@gmail.com</p>
              <p>El Aguaje, Emiliano Zapata, Veracruz</p>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/ProHealthNatural" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Pro Health Natural Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
