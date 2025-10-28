"use client";

import { useCart } from "@/context/cart-context";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

// Componente Modal de Éxito (Success Modal)
// Usaremos clases de Tailwind para replicar tu CSS y simplificar la integración.
const SuccessModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
    // Si no es visible, no renderizamos nada
    if (!isVisible) return null;

    // Clases CSS de tu antiguo styles.css, adaptadas a Tailwind
    // Transiciones y opacidad se manejan mejor con una biblioteca como 'framer-motion'
    // o simplemente con clases condicionales en este ejemplo.
    const modalClasses = `
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        bg-gray-100 border-2 border-green-600 rounded-lg shadow-xl p-4 
        w-80 z-50 transition-opacity duration-500 ease-in-out
        flex flex-col items-center text-center
        ${isVisible ? 'opacity-100' : 'opacity-0'}
    `;

    return (
        <div 
            className={modalClasses}
            id="id_confrmdiv"
            // Nota: Aquí no usamos el display:none/flex de tu CSS, 
            // sino que React controla la existencia del elemento con 'if (!isVisible) return null;'
        >
            <h3 className="text-xl font-bold text-green-700 mb-4 mt-2">
                ¡Pago Exitoso! ✅
            </h3>
            
            <p className="text-sm text-gray-700 mb-4">
                Tu orden ha sido registrada correctamente.
            </p>

            <button 
                id="id_truebtn"
                onClick={onClose}
                className="bg-green-100 border border-gray-400 rounded px-4 py-1 text-center w-20 
                           cursor-pointer hover:bg-green-600 hover:text-white transition-colors duration-500"
            >
                Ok
            </button>
        </div>
    );
};


export default function CartPage() {
  const { items, total, clearCart } = useCart();
  const { storeCode } = useParams();

  // 1. Estado para el Modal de Éxito
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  
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

    // 🔥 Guarda la orden y los datos del cliente
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: details.payer.email_address,
        totalAmount: total,
        paymentId,
        storeId: 1, // 🔧 deberás obtenerlo según storeCode
        items,
        customer, // enviamos los datos del formulario
      }),
    });

    clearCart();
    // 3. Reemplazamos alert() por el estado del modal
    setShowSuccessModal(true);
    // alert("Pago completado y orden registrada ✅"); // Eliminado
  };

  if (items.length === 0)
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío 🛍️</h1>
      </div>
    );

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Tu carrito 🛒</h1>

      {/* 2. Incluir el modal al final del componente */}
      <SuccessModal 
        isVisible={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
      {/* Opcional: Oscurecer el fondo si el modal está visible */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {/* El resto del contenido de tu página... */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🧾 Productos */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6 max-w-xl">
          {/* ... (Contenido de Productos) ... */}
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
          {/* ... (Contenido de Datos del cliente) ... */}
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
          {/* ... (Contenido de Pago) ... */}
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
    </div>
  );
}