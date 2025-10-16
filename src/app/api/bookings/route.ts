import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 *  GET: obtener todas las citas
 */
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: "asc" },
      include: { store: true },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return NextResponse.json(
      { error: "Error al obtener citas" },
      { status: 500 }
    );
  }
}

/**
 *  POST: crear una nueva cita
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, date, message, storeCode } = body;

    // Validación básica
    if (!name || !email || !service || !date || !storeCode) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Buscar la tienda por código ("mexico" o "usa")
    const store = await prisma.store.findUnique({
      where: { code: storeCode },
    });

    if (!store) {
      return NextResponse.json(
        { error: "Tienda no encontrada" },
        { status: 404 }
      );
    }

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

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error al crear cita:", error);
    return NextResponse.json(
      { error: "Error al crear cita" },
      { status: 500 }
    );
  }
}
