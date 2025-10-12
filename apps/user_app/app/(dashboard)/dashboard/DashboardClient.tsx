"use client";

import React, { useState } from "react";
import {ArrowUpRight, ArrowDownLeft, Banknote, User, CheckCircle2, Clock, XCircle, } from "lucide-react";
import { BalanceCard } from "../../../components/BalanceCard";
import { useSession } from "next-auth/react";
import { BankTransactionList } from "../../../components/BankTransactionList";
import { P2PTransactionList } from "../../../components/P2PTransactiopnList";
import { useRouter } from "next/navigation";

interface DashboardProps {
  balance: number;
  totalSent: number;
  totalReceived: number;
  totalBankAdded: number;
  p2pTransfers: any[];
  bankTransfers: any[];
}

export default function DashboardClient({
  balance,
  totalSent,
  totalReceived,
  totalBankAdded,
  p2pTransfers,
  bankTransfers,
}: DashboardProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<"p2p" | "bank">("p2p");
  const {data:session} = useSession();
  const userId = session?.user?.id
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Wallet Dashboard</h1>
          <p className="text-gray-500">Manage your wallet and transactions</p>
        </div>
        <div className="flex items-center gap-3 bg-white shadow rounded-xl px-4 py-2 border">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-gray-800 font-medium">Hi, Anikyet</span>
        </div>
      </div>

      {/* Wallet Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
    <BalanceCard amount={balance}  />
        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <button onClick={()=> router.push("/transfer")} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 transition">
              <Banknote className="w-4 h-4" /> Add Money
            </button>
            <button onClick={()=> router.push("/p2p")} className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-xl py-2.5 font-medium text-gray-800 flex items-center justify-center gap-2 transition">
              <ArrowUpRight className="w-4 h-4" /> Send Money
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border">
          <div>
            <p className="text-gray-500 text-sm">Total Sent (P2P)</p>
            <p className="text-xl font-semibold text-gray-800">₹{(totalSent / 100).toLocaleString()}</p>
          </div>
          <ArrowUpRight className="text-red-500 w-6 h-6" />
        </div>
        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border">
          <div>
            <p className="text-gray-500 text-sm">Total Received</p>
            <p className="text-xl font-semibold text-gray-800">₹{(totalReceived / 100).toLocaleString()}</p>
          </div>
          <ArrowDownLeft className="text-green-500 w-6 h-6" />
        </div>
        <div className="bg-white rounded-2xl shadow p-5 flex justify-between items-center border">
          <div>
            <p className="text-gray-500 text-sm">Total Added from Bank</p>
            <p className="text-xl font-semibold text-gray-800">₹{(totalBankAdded / 100).toLocaleString()}</p>
          </div>
          <Banknote className="text-blue-500 w-6 h-6" />
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>

          {/* Toggle between P2P and Bank */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedTab("p2p")}
              className={`px-4 py-1.5 rounded-md font-medium text-sm transition ${
                selectedTab === "p2p"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              P2P Transfers
            </button>
            <button
              onClick={() => setSelectedTab("bank")}
              className={`px-4 py-1.5 rounded-md font-medium text-sm transition ${
                selectedTab === "bank"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Bank Add Money
            </button>
          </div>
        </div>

        {/* Conditional Table */}
        {selectedTab === "p2p" ? (
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-2 px-3">Type</th>
                <th className="py-2 px-3">User</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {p2pTransfers.map((tx) => (
                 <P2PTransactionList key={tx.id} id={tx.id} userId={Number(userId)} amount={tx.amount} fromUserId={tx.fromUserId} fromUser={tx.fromUser.name} toUser={tx.toUser.name} timestamp={tx.timestamp}/>
                
              ))}
              {p2pTransfers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No P2P transfers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-2 px-3">Provider</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {bankTransfers.map((tx) => (
                // <tr key={tx.id} className="border-b hover:bg-gray-50">
                //   <td className="py-2 px-3 flex items-center gap-2">
                //     <Banknote className="text-blue-500 w-4 h-4" /> {tx.provider}
                //   </td>
                //   <td className="px-3 text-blue-600 font-medium">
                //     + ₹{(tx.amount / 100).toLocaleString()}
                //   </td>
                //   <td className="px-3">{renderStatus(tx.status)}</td>
                //   <td className="px-3">
                //     {new Date(tx.startTime).toLocaleDateString("en-GB", {
                //       timeZone: "UTC",
                //     })}
                //   </td>
                // </tr>
                <BankTransactionList key={tx.id}  provider={tx.provider} amount={tx.amount} startTime={tx.startTime} status={tx.status} />
              ))}
              {bankTransfers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No bank add money transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
