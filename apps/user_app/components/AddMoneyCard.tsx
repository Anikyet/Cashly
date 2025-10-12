"use client";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

async function handleClick(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  amount: number,
  provider: string,
  router: ReturnType<typeof useRouter>
) {
  setLoading(true);
  const res = await createOnRampTransaction(amount * 100, provider);
  const status = res.status ? "success" : "failed";
  setLoading(false);
  router.push(`/status/${status}`);
}

export const AddMoney = () => {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  return (
    <Card title="Add Money">
      <div className="w-full space-y-4">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          onChange={(value) => setAmount(Number(value))}
        />

        <div className=" text-left">Bank</div>
        <Select
          onSelect={(value) => setProvider(value)}
          options={SUPPORTED_BANKS.map((x) => ({ key: x.name, value: x.name }))}
        />

        <div className="flex justify-center pt-4">
          <button
            disabled={loading || !amount || !provider}
            onClick={async () => {
              const result = await Swal.fire({
                title: "Are you sure?",
                text: `You’re adding ₹${amount} via ${provider}.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, continue",
              });

              if (result.isConfirmed) {
                Swal.fire({
                  title: "Processing...",
                  text: "Please wait while we complete your transaction.",
                  allowOutsideClick: false,
                  didOpen: () => Swal.showLoading(),
                });

                await handleClick(setLoading, amount, provider, router);
                Swal.close();
              }
            }}
            className={`py-2 px-4 rounded-lg text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Add Money"}
          </button>
        </div>
      </div>
    </Card>
  );
};
