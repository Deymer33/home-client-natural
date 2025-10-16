import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingTable from "@/components/admin/booking-table";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Citas registradas</h1>
      <BookingTable />
    </div>
  );
}
