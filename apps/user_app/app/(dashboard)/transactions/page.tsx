
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { bankTransactions, p2pTransactions } from "../../lib/actions/getTransactions";
import ListTransactions from "./ListTransactions";
export default async function() {

    const session = await getServerSession(authOptions);
    const userId = session?.user.id || "";

    if (!session?.user) {
        redirect("/signin"); 
      }
    const {bankTransfers} = await bankTransactions({userId})
    const {p2pTransfers} = await p2pTransactions({userId});
    return <div className="">
        <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex flex-col   mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Transactions</h3> 
            <div><ListTransactions bankTraData={bankTransfers} p2pTraData={p2pTransfers} /></div>
        </div>
      </div>
    </div>
}