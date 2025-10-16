import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Crear o mantener tiendas
  await prisma.store.upsert({
    where: { code: "mexico" },
    update: {},
    create: { name: "México", code: "mexico" },
  });

  await prisma.store.upsert({
    where: { code: "usa" },
    update: {},
    create: { name: "USA", code: "usa" },
  });

  // Crear usuario admin
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Administrador",
      password: passwordHash,
      role: "admin",
    },
  });

  console.log("✅ Tiendas y usuario admin creados (admin@example.com / 123456)");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
