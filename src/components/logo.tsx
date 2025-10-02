import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-2" 
      aria-label="Natural health center"
    >
      <Image 
        src="/logo.png"  //  busca en /public
        alt="Logo Natural Health Center"
        width={100}       // ajusta el tamaño
        height={80}
      />
      <span className="font-headline text-2xl font-bold text-primary">
        
      </span>
    </Link>
  );
}
