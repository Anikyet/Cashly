import prisma from "@repo/db";
import DashboardClient from "./DashboardClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { p2pTransactions } from "../../lib/actions/getTransactions";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin"); // or "/signup"
  }
  const userId = session.user.id;
  const [balance, sentTotalObj, receivedTotalObj, bankTotalObj, bankTransfers]  = await Promise.all([
    prisma.balance.findUnique({
      where: { userId: Number(userId) },
    }),
    // Aggregate total sent
    prisma.p2pTransfer.aggregate({
      _sum: { amount: true },
      where: { fromUserId: Number(userId) },
    }),

    // Aggregate total received
    prisma.p2pTransfer.aggregate({
      _sum: { amount: true },
      where: { toUserId: Number(userId) },
    }),
    // Aggregate total bank transfers (onRampTransaction with Success status)
    prisma.onRampTransaction.aggregate({
      _sum: { amount: true },
      where: { userId:Number(userId), status: "Success" },
    }),
    prisma.onRampTransaction.findMany({
      where: { userId: Number(userId),
       },
      orderBy: { startTime: "desc" },
      take:5
    }),
  ]);


//   const totalSent = sentP2P.reduce((sum, tx) => sum + Number(tx.amount), 0);
// const totalReceived = receivedP2P.reduce((sum, tx) => sum + Number(tx.amount), 0);
const totalSent = sentTotalObj._sum.amount ?? 0;
const totalReceived = receivedTotalObj._sum.amount ?? 0;
const totalBankAdded = bankTotalObj._sum.amount ?? 0;

  const p2pTransfers = await p2pTransactions({ userId });
return (
  <DashboardClient
    balance={balance?.amount || 0}
    totalSent={totalSent}
    totalReceived={totalReceived}
    totalBankAdded={totalBankAdded}
    p2pTransfers={p2pTransfers.p2pTransfers}
    bankTransfers={bankTransfers}
  />
);

}
