"use client";

import { signOut } from "next-auth/react";

export default async function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Bienvenido al Panel</h2>
      <p>Aquí podrás administrar tiendas, productos y reservas.</p>
    </div>
  );
}


export function AdminLogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-sm text-red-600 hover:underline"
    >
      Cerrar sesión
    </button>
  );
}
