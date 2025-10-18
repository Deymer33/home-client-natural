import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    
    const formatted = orders.map((o) => ({
      ...o,
      customer: {
        name: o.customerName,
        email: o.customerEmail,
        address: o.customerAddress,
        city: o.customerCity,
        country: o.customerCountry,
        phone: o.customerPhone,
      },
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error al listar órdenes:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener las órdenes" },
      { status: 500 }
    );
  }
}
