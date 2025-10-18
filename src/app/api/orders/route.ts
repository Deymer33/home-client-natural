import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, totalAmount, paymentId, storeId, items, customer } = body;

    const order = await prisma.order.create({
      data: {
        userEmail,
        totalAmount,
        paymentId,
        status: "paid",
        storeId,

        //  guardamos datos del cliente
        customerName: customer?.name || null,
        customerEmail: customer?.email || null,
        customerAddress: customer?.address || null,
        customerCity: customer?.city || null,
        customerCountry: customer?.country || null,
        customerPhone: customer?.phone || null,

        items: {
          create: items.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creando orden:", error);
    return NextResponse.json(
      { error: "No se pudo crear la orden" },
      { status: 500 }
    );
  }
}
