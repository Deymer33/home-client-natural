import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(stores);
  } catch (err) {
    console.error("Error fetching stores:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
