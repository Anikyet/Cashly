import { Button } from "./button";
import { Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AppbarProps {
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    onSignin,
    onSignout
}: AppbarProps) => {
    const session = useSession();
    const user = session.data?.user;
    const router = useRouter();

    return <div className="flex justify-between border-b px-4 border-slate-300 bg-gradient-to-t from-blue-50 to-white py-2">
        <div className="text-lg font-bold flex flex-row items-center justify-center gap-2 cursor-pointer " onClick={() => router.push("/")}>
            <Wallet className="w-6 h-6 text-black" />
            Cashly
        </div>
        <div className="flex flex-row  justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            <div onClick={()=> (user ? window.location.href = "/dashboard" : router.push("/signup"))} className="text-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">{user ? `${user.name}` : "Welcome, Guest"}</div>
        </div>
    </div>
}