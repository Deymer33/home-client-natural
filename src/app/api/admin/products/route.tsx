import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

// GET - lista todos los productos (activos e inactivos)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storeCode = searchParams.get("store"); 

  const products = await prisma.productStore.findMany({
    where: storeCode
      ? { store: { code: storeCode } }
      : undefined,
    include: {
      store: true,
      product: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(products);
}
