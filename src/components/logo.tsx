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
        src="/logo.png"  // Next busca en /public
        alt="Logo Natural Health Center"
        width={40}       // ajusta el tamaño
        height={40}
      />
      <span className="font-headline text-2xl font-bold text-primary">
        Natural heal center
      </span>
    </Link>
  );
}
