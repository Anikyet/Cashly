"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    const result = await Swal.fire({
      title: "Confirm Transfer",
      text: `Are you sure you want to send ₹${amount} to ${number}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    });

    if (!result.isConfirmed) return;

    // Show loading alert
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we send your money.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setLoading(true);
    const res = await p2pTransfer(number, Number(amount) * 100);
    setLoading(false);
    Swal.close(); // close loading dialog
    setMessage(res.message);

    // Show result alert
    if (res?.status) {
      await Swal.fire({
        title: "Success!",
        text: "Money sent successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push(`/status/success`);
    } else {
      await Swal.fire({
        title: "Failed!",
        text: res.message || "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="h-[67vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder="Number"
              label="Number"
              onChange={(value) => setNumber(value)}
            />
            <TextInput
              placeholder="Amount"
              label="Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={handleSend} loading={loading}>
                Send
              </Button>
            </div>

            {message && (
              <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
            )}
          </div>
        </Card>
      </Center>
    </div>
  );
}
