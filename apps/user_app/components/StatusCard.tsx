"use client";

import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface StatusCardProps {
  status: "success" | "failed";
}

export const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  const router = useRouter();
  const isSuccess = status === "success";
  setTimeout(() => {
    window.location.href = "/transactions";
  }, 3000);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className={`flex flex-col items-center gap-3 p-8 rounded-2xl shadow-md w-72 ${
          isSuccess ? "bg-green-50" : "bg-red-50"
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-16 h-16 text-green-500" />
        ) : (
          <XCircle className="w-16 h-16 text-red-500" />
        )}

        <h2
          className={`text-xl font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Transaction Processed" : "Transaction Failed"}
        </h2>
      </div>
    </div>
  );
};
