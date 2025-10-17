"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface ProductStore {
  id: number;
  price: number | null;
  active: boolean;
  store: { id: number; name: string; code: string };
  product: {
    id: number;
    name: string;
    description?: string;
    basePrice: number;
    imageUrl?: string;
  };
}

export default function StorePage() {
  const { storeCode } = useParams();
  const [products, setProducts] = useState<ProductStore[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ useCart dentro del componente
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?store=${storeCode}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };
    if (storeCode) fetchProducts();
  }, [storeCode]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  if (products.length === 0)
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Tienda: {storeCode}</h1>
        <p className="text-muted-foreground">
          No hay productos disponibles en esta tienda.
        </p>
      </div>
    );

  return (
    <div className="container py-12">
      <h1 className="font-headline text-4xl mb-8 text-center">
        {products[0]?.store?.name || "Tienda"} — Productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <Card key={item.id}>
            {item.product.imageUrl && (
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <CardTitle>{item.product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {item.product.description || "Sin descripción"}
              </p>
              <p className="font-medium text-lg mb-3">
                ${item.price ?? item.product.basePrice}
              </p>
              <Button
                className="mt-3 w-full"
                onClick={() =>
                  addItem({
                    id: item.product.id,
                    name: item.product.name,
                    price: item.price ?? item.product.basePrice,
                    imageUrl: item.product.imageUrl,
                    quantity: 1,
                  })
                }
              >
                Agregar al carrito
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
