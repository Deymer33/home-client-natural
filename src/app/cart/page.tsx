"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Tu carrito</h1>

      {items.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Tu carrito está vacío.
        </p>
      ) : (
        <>
          <div className="grid gap-4 mb-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-md border">
                      Sin imagen
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearCart}>
                Vaciar carrito
              </Button>
              <Button>Proceder al pago</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
