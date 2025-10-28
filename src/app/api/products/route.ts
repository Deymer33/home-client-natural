// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

// GET - lista productos por tienda
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storeCode = searchParams.get("store"); 

  const products = await prisma.productStore.findMany({
    where: {
      active: true, 
      product: { active: true }, 
      ...(storeCode ? { store: { code: storeCode } } : {}), 
    },
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

// PATCH - activar/desactivar producto
export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, active } = body;

  const updated = await prisma.productStore.update({
    where: { id },
    data: { active },
    include: { product: true, store: true },
  });

  return NextResponse.json(updated);
}

// PUT - editar producto
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, basePrice, imageUrl } = body;

    if (!id) {
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        basePrice,
        imageUrl, //actualiza imagen si se envía
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error actualizando producto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// POST - crear producto y asignarlo a una o varias tiendas
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, basePrice, stores, imageUrl } = body;

    if (!name || !basePrice || !stores || stores.length === 0) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const validStores = await prisma.store.findMany({
      where: { code: { in: stores } },
    });

    if (validStores.length === 0) {
      return NextResponse.json({ error: "Tiendas no encontradas" }, { status: 404 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        basePrice,
        imageUrl,
        stores: {
          create: validStores.map((store) => ({
            storeId: store.id,
            active: true,
          })),
        },
      },
      include: { stores: true },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error("Error creando producto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
