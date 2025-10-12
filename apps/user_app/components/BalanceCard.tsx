import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount}: {amount: number }) => {
    return <>
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-medium mb-2">Wallet Balance</h2>
          <p className="text-4xl font-bold">₹{(amount / 100)}</p>
        </div>
    </>
}