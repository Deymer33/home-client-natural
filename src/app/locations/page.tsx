"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";

interface Store {
  id: number;
  name: string;
  code: string;
  createdAt: string;
}

export default function LocationsPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetch("/api/stores");
        const data = await res.json();
        setStores(data);
      } catch (err) {
        console.error("Error cargando tiendas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="font-headline text-5xl mb-8 text-center">
        Nuestras Tiendas
      </h1>
      <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
        Visítanos para descubrir nuestros productos y servicios.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <MapPin className="text-primary" />
                {store.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-muted-foreground">
                Código: <span className="font-medium">{store.code}</span>
              </p>
              <Button asChild>
                <a href={`/locations/${store.code}`}>Ir a la tienda</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
