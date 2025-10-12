"use server"

import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export async function verifyOtp({email, otp, password,number}:{email:string, otp:string,password:string,number:string}){

    const existingOtp = await prisma.emailOtp.findFirst({
        where:{
            email,
            otp,
        }
    });
    if(!existingOtp){
        return {success:false, message:"Invalid OTP"};
    }
    
    if(existingOtp.expiresAt < new Date()){
        return {success:false, message:"OTP expired"};
    }
    const existingUser = await prisma.user.findFirst({
        where:{
            email
        }});

    if(existingUser){
        return {success:false, message:"User already exists. Please login"};
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try{

    
    const newUser = await prisma.user.create({
       data:{
        email,
        number,
        password: hashedPassword,   
        name: email.split("@")[0],
       } 
    })
    await prisma.balance.create({
        data:{
            userId:newUser.id,
            amount:0,
            locked:0
            
        }
    })
    await prisma.emailOtp.deleteMany({ where: { email } });
    return {success:true, message:"User created successfully"};
   
    } catch(e){
        console.error(e);
        return {success:false, message:"Error creating user"};
   }
}