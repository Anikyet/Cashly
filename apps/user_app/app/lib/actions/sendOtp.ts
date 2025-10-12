"use server"
import prisma from "@repo/db/client";
import nodemailer from "nodemailer";

export async function sendOtp(email:string){
    const otp  = Math.floor( Math.random() * 900000).toString();
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS);

    const otpCrearted = await prisma.emailOtp.create({
        data:{
            email,
            otp,
            expiresAt : new Date(Date.now() + 1000 *60 *5),
        },
    });

    if(!otpCrearted){
        return {success:false, message:"Error creating OTP"};
    }
    try{
      
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to:email,
        subject:"OTP for Sginup into Cashly",
        text:`Cashly verification code: ${otp}. Valid for 5 minutes. Enter it to complete your login. Dev-Aniket Patial.`,
    });
    return {success: true,message:"OTP sent successfully"}
    
    }catch(e){
        console.error("Error sending email", e);
        return {success: false ,message:"Error sending OTP email"};
    }
}