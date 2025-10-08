import { NextResponse } from "next/server"
import db from '@repo/db/client';

// const client = new PrismaClient();

export const GET = async () => {
    await db.user.create({
        data: {
            email: "asd",
            name: "adsads",
            number: "123123",
            password: "asdasd"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}