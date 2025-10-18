// src/app/admin/page.tsx (o donde tengas tu DashboardPage)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import BookingTable from "@/components/admin/booking-table";
import ProductTable from "@/components/admin/product-table";
import OrderTable from "@/components/admin/order-table";


import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"; // componente base de UI (shadcn style)

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Panel de administración</h1>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">Citas</TabsTrigger>
          <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>

        {/* --- Citas --- */}
        <TabsContent value="bookings">
          <h2 className="text-2xl font-semibold mb-4">Citas registradas</h2>
          <BookingTable />
        </TabsContent>

        {/* --- Productos --- */}
        <TabsContent value="products">
          <h2 className="text-2xl font-semibold mb-4">Productos</h2>
          <ProductTable />
        </TabsContent>
        {/* --- Pedidos --- */}
        <TabsContent value="orders">
          <h2 className="text-2xl font-semibold mb-4">Pedidos</h2>
          <OrderTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
