import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  // 🔒 Protección
  if (!session?.user || session.user.role !== "admin") {
    redirect("/login"); // 👈 IMPORTANTE: redirigir al login global
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm p-4 flex justify-between">
        <div>
          <h1 className="font-bold text-lg">Panel Administrativo</h1>
          <p className="text-sm text-gray-500">
            Sesión: {session.user.email} ({session.user.role})
          </p>
        </div>
      </header>

      <main className="container mx-auto py-10">{children}</main>
    </div>
  );
}
