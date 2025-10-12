"use client";

import { useState } from "react";
import { sendOtp } from "../../lib/actions/sendOtp";
import { verifyOtp } from "../../lib/actions/verifyOtp";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignupPage() {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const session = useSession();
  const [showPassword, setShowPassword] = useState(false);

  if (session?.data?.user) {
    router.push("/");
  }

  const otpCall = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await sendOtp(email);

      if (res.success) {
        setStep("otp");
        setMessage(res.message);
      } else {
        setMessage(res.message || "Error sending OTP");
      }
    } catch (err) {
      setMessage("Error sending OTP");
    }
    setLoading(false);
  };

  const otpVerify = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await verifyOtp({ email, otp, password, number: phone });
      if (res.success) {
        setMessage("Signup successful! You can now log in.");
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      } else {
        setMessage(res.message || "Invalid OTP");
      }
    } catch (err) {
      setMessage("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          {step === "form" ? "Create Account" : "Verify Email"}
        </h1>

        {step === "form" ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setShowPassword((prev) => !prev)} className=" absolute right-3 top-3 cursor-pointer text-sm text-blue-500">{showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              <path
                fill-rule="evenodd"
                d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                clip-rule="evenodd"
              />
              <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
            </svg>
          )}</div>
        </div>
            <button
              onClick={otpCall}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <div className="text-center py-2">Already a user?  <span className="cursor-pointer text-blue-500" onClick={() => router.push("/signin")}>SignIn</span></div>

          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <button
              onClick={otpVerify}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
