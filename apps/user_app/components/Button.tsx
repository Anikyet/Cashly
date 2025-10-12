"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: ReactNode;
  href?: string; // URL to navigate to
  onClick?: () => void; // optional custom handler
}

export const Button = ({ onClick, children, href }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(); // run custom function if provided
    }
    if (href) {
      router.push(href); // navigate to given URL
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {children}
    </button>
  );
};
