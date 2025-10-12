import { StatusCard } from "../../../../components/StatusCard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

interface PageProps {
  params: { status: "success" | "failed" };
}

export default async function StatusPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  // If no user is logged in, redirect to /signin
  if (!session?.user) {
    redirect("/signin");
  }
  return <StatusCard status={params.status} />;
}
