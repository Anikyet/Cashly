import prisma from "@repo/db/client";
// import { AddMoney } from "../../../components/AddMoneyCard";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRamptransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect("/"); // or "/signup"
      } 
      
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    return <div className="p-4">
        <div className="text-4xl text-slate-800 pt-8 mb-8 font-bold">
            Add Money to your Wallet
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div className="">
                <BalanceCard amount={balance.amount}  />
            </div>
        </div>
    </div>
}