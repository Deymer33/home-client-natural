import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: obtener todas las citas (con filtro opcional por tienda)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storeCode = searchParams.get("store");

  const bookings = await prisma.booking.findMany({
    where: storeCode ? { store: { code: storeCode } } : undefined,
    include: { store: true },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(bookings);
}

// POST: crear una nueva cita (desde el formulario del cliente)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, date, message, storeCode } = body;

    if (!name || !email || !service || !date || !storeCode) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Buscar tienda por código
    const store = await prisma.store.findUnique({
      where: { code: storeCode },
    });

    if (!store) {
      return NextResponse.json({ error: "Tienda no encontrada" }, { status: 404 });
    }

    // Crear la cita
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        service,
        date: new Date(date),
        message,
        storeId: store.id,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err: any) {
    console.error("❌ Error al crear cita:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// PATCH: actualizar estado de una cita
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("❌ Error al actualizar estado:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
