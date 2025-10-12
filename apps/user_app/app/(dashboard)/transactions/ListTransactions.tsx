"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  bankTransactions,
  p2pTransactions,
} from "../../lib/actions/getTransactions";
import { P2PTransactionList } from "../../../components/P2PTransactiopnList";
import { BankTransactionList } from "../../../components/BankTransactionList";

async function getData(selectedTab: "bank" | "p2p", userId: string, rowFlag: number) {
  if (selectedTab === "bank") {
    const { bankTransfers, totalBankTrans } = await bankTransactions({
      rowFlag,
      userId,
    });
    console.log("client"+totalBankTrans)
    return { bankTransfers, totalBankTrans };
  } else {
    const { p2pTransfers, totalP2PTrans } = await p2pTransactions({
      rowFlag,
      userId,
    });
    console.log("client"+totalP2PTrans)
    return { p2pTransfers, totalP2PTrans };
  }
}

interface TransactionsListProps {
  p2pTraData: any[];
  bankTraData: any[];
}

export default function ListTransactions({
  bankTraData,
  p2pTraData,
}: TransactionsListProps) {
  const [selectedTab, setSelectedTab] = useState<"p2p" | "bank">("bank");
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // ✅ P2P States
  const [p2pTransfers, setP2pTransfers] = useState(p2pTraData);
  const [p2pPage, setP2pPage] = useState(1);
  const [totalP2PTrans, setTotalP2PTrans] = useState(0);
  const [loadingP2P, setLoadingP2P] = useState(false);

  // ✅ Bank States
  const [bankTransfers, setBankTransfers] = useState(bankTraData);
  const [bankPage, setBankPage] = useState(1);
  const [totalBankTrans, setTotalBankTrans] = useState(0);
  const [loadingBank, setLoadingBank] = useState(false);

  const handleShowMore = async (tab: "p2p" | "bank") => {
    if (!userId) return;

    if (tab === "p2p") {
      setLoadingP2P(true);
      const nextPage = p2pPage + 1;
      const res = await getData("p2p", userId, nextPage);

      setP2pTransfers((prev) => [...prev, ...(res.p2pTransfers || [])]);
      setTotalP2PTrans(Number(res.totalP2PTrans));
      console.log("after sertting up"+ res.totalP2PTrans);
      console.log("after setting up "+ totalP2PTrans);
      setP2pPage(nextPage);
      setLoadingP2P(false);
    } else {
      setLoadingBank(true);
      const nextPage = bankPage + 1;
      const res = await getData("bank", userId, nextPage);

      setBankTransfers((prev) => [...prev, ...(res.bankTransfers || [])]);
      setTotalBankTrans(res.totalBankTrans || 0);
      setBankPage(nextPage);
      setLoadingBank(false);
    }
    console.log("comparsion "+ (p2pTransfers.length >= totalP2PTrans))
    console.log(p2pTransfers.length)
    console.log(totalP2PTrans)
  };

  return (
    <>
      {/* Toggle between P2P and Bank */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-4">
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

      {/* Conditional Table */}
      {selectedTab === "p2p" ? (
        <table className="w-full text-left text-sm  text-gray-700">
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
              <P2PTransactionList
                key={tx.id}
                id={tx.id}
                userId={Number(userId)}
                amount={tx.amount}
                fromUserId={tx.fromUserId}
                fromUser={tx.fromUser.name}
                toUser={tx.toUser.name}
                timestamp={tx.timestamp}
              />
            ))}

            {p2pTransfers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No P2P transfers found.
                </td>
              </tr>
            )}

            <tr>
              <td colSpan={4} className="text-center py-4">
                <button
                  onClick={ () =>  handleShowMore("p2p")}
                 disabled={loadingP2P}
                  className="px-4 py-1.5 rounded-md font-medium text-sm transition  hover:bg-gray-300 hover:text-gray-600 cursor-pointer bg-blue-600 text-white" >
                  {loadingP2P
                    ? "Fetching Records..."
                    : "Show More"}
                </button>
              </td>
            </tr>
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
              <BankTransactionList
                key={tx.id}
                provider={tx.provider}
                amount={tx.amount}
                startTime={tx.startTime}
                status={tx.status}
              />
            ))}

            {bankTransfers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No bank add money transactions found.
                </td>
              </tr>
            )}

            <tr>
              <td colSpan={4} className="text-center py-4">
                <button
                  onClick={() => handleShowMore("bank")}
                  disabled={loadingBank }
                  className="px-4 py-1.5 rounded-md font-medium text-sm transition  hover:bg-gray-300 hover:text-gray-600 cursor-pointer bg-blue-600 text-white" >

                  {loadingBank
                    ? "Fetching Records..."
                    : "Show More"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
