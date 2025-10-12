"use client";
import { Wallet } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="border border-gray-200 bg-gray-50  mt-10 bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Cashly</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cashly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
