import { NextResponse } from "next/server";
import db from "@repo/db/client";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  // generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // store in DB with expiry (5 min)
  await db.emailOtp.create({
    data: {
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  // send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your Signup OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  return NextResponse.json({ success: true });
}
