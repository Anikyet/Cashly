"use client";

import { ReactNode, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  loading?:boolean
  onClick: () => void;
}
export const Button = ({ onClick, children,loading=false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={loading} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {loading ? "Processing..." : children}
    </button>

  );
};