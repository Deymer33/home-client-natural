"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  totalAmount: number;
  userEmail: string;
  paymentId?: string | null;
  customerName?: string | null;
  customerEmail?: string | null;
  customerAddress?: string | null;
  customerCity?: string | null;
  customerCountry?: string | null;
  customerPhone?: string | null;
  items: OrderItem[];
}

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/list");
      if (!res.ok) throw new Error("Error al cargar pedidos");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error("Error al obtener pedidos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/orders/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        toast.success("Estado actualizado correctamente");
        fetchOrders();
      } else {
        toast.error("Error al actualizar el estado");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error de red");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  if (orders.length === 0)
    return <p className="text-gray-500 text-center mt-6">No hay pedidos todavía.</p>;

  return (
    <div>
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <Button onClick={fetchOrders}>Refrescar</Button>
      </div>

      {/* Tabla principal */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>

              <TableCell>{order.customerName || "—"}</TableCell>
              <TableCell>{order.customerEmail || order.userEmail}</TableCell>
              <TableCell>{order.customerPhone || "—"}</TableCell>

              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    order.status === "paid"
                      ? "default"
                      : order.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>

              <TableCell>
                {new Date(order.createdAt).toLocaleString()}
              </TableCell>

              <TableCell className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(order.id, "shipped")}
                >
                  Enviar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(order.id, "delivered")}
                >
                  Entregar
                </Button>

                {/* Botón para ver detalles */}
                <Dialog open={open && selectedOrder?.id === order.id} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setOpen(true);
                      }}
                    >
                      Ver
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Detalles del pedido #{order.id}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                      {/* Datos del cliente */}
                      <div className="border rounded-md p-3 bg-muted/30">
                        <p><strong>Cliente:</strong> {order.customerName || "—"}</p>
                        <p><strong>Correo:</strong> {order.customerEmail || order.userEmail}</p>
                        {order.customerPhone && <p><strong>Teléfono:</strong> {order.customerPhone}</p>}
                        {order.customerAddress && (
                          <p>
                            <strong>Dirección:</strong>{" "}
                            {`${order.customerAddress}, ${order.customerCity || ""}, ${order.customerCountry || ""}`}
                          </p>
                        )}
                      </div>

                      {/* Productos */}
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Subtotal</TableCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
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
                              </TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>${item.price.toFixed(2)}</TableCell>
                              <TableCell>
                                ${(item.price * item.quantity).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <div className="text-right font-semibold mt-4">
                        Total: ${order.totalAmount.toFixed(2)}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
