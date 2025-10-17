// src/app/admin/products/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductTable from "@/components/admin/product-table";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Administrar productos</h1>
      <ProductTable />
    </div>
  );
}
