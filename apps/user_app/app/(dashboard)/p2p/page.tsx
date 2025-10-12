import { redirect } from "next/navigation";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


export default async function() {
        const session = await getServerSession(authOptions);
    
      if (!session?.user) {
        redirect("/signin"); // or "/signup"
      }
    return <div className="w-full">
        <SendCard />
    </div>
}