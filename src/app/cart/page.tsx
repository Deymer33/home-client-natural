"use client";

import { useCart } from "@/context/cart-context";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";



export default function CartPage() {
  const { items, total, clearCart } = useCart();
  const { storeCode } = useParams();
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  // 🧾 Estado para los datos del usuario
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });

  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...customer, [name]: value };
    setCustomer(updated);

    // validación simple
    const isValid =
      updated.name &&
      updated.email &&
      updated.address &&
      updated.city &&
      updated.country &&
      updated.phone;
    setFormValid(!!isValid);
  };

  const handleApprove = async (data: any, actions: any) => {
  const details = await actions.order.capture();
  const paymentId = details.id;

  await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: details.payer.email_address,
      totalAmount: total,
      paymentId,
      storeId: 1,
      items,
      customer,
    }),
  });

  clearCart();

  // ✅ Espera a que PayPal cierre su popup
  setTimeout(() => setPaymentSuccess(true), 400);
};


  if (items.length === 0)
  return (
    <div className="container py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>

      {/* Mensaje simple si el pago fue exitoso */}
      {paymentSuccess && (
        <div
          role="status"
          className="inline-flex items-center gap-2 mt-4 px-4 py-3 rounded-md bg-green-50 text-green-800 border border-green-200"
        >
          <CheckCircle className="w-6 h-6" />
          <span>Pago exitoso — ¡gracias por tu compra!</span>
        </div>
      )}
    </div>
  );


  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Tu carrito 🛒</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🧾 Productos */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Productos</h2>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-4"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  {item.quantity && (
                    <p className="text-sm text-gray-500">
                      Cantidad: {item.quantity}
                    </p>
                  )}
                </div>
                <p className="font-semibold">
                  ${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* 🧍 Datos del cliente */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Información de envío 📦
          </h2>

          <form className="grid grid-cols-1 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={customer.name}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={customer.email}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={customer.address}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={customer.city}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="País"
              value={customer.country}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={customer.phone}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </form>
        </div>

        {/* Pago */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

          <div className="flex justify-between text-lg mb-6">
            <span>Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>

          {!formValid ? (
            <p className="text-sm text-red-500 mb-2">
              Completa los datos antes de pagar
            </p>
          ) : null}

          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
              currency: "USD",
            }}
          >
            <div className="scale-90 origin-center mx-auto w-full">
              <PayPalButtons
                style={{
                  layout: "vertical",
                  height: 35,
                  shape: "pill",
                }}
                createOrder={(data, actions) => {
                  if (!formValid) {
                    alert("Por favor completa tus datos antes de pagar.");
                    return Promise.reject();
                  }

                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: total.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={handleApprove}
                onError={(err) => {
                  console.error("Error en el pago:", err);
                  alert("Error procesando el pago 😞");
                }}
              />
            </div>
          </PayPalScriptProvider>

          <Button
            variant="outline"
            onClick={clearCart}
            className="mt-4 w-full text-red-600 border-red-400 hover:bg-red-50"
          >
            Vaciar carrito 🗑️
          </Button>
        </div>
      </div>
      <Dialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
        <DialogContent className="text-center border-4 border-red-500 z-[2147483647]">
          <DialogHeader>
            <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />

            <DialogTitle className="text-2xl font-bold">
              ¡Pago exitoso!
            </DialogTitle>

            <DialogDescription className="text-lg">
              Tu pago fue procesado correctamente y tu orden ha sido registrada.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button className="w-full" onClick={() => setPaymentSuccess(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
