import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Natural healt center">
      <Leaf className="h-8 w-8 text-primary" />
      <span className="font-headline text-2xl font-bold text-primary">
        Natural heal center
      </span>
    </Link>
  );
}
