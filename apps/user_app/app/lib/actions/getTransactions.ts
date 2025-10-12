"use server"
import prisma from "@repo/db"

export const p2pTransactions = async ({ rowFlag = 1, userId }: { rowFlag?: number, userId: string }) => {

    const p2pTransfers = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(userId) },
                { toUserId: Number(userId) }
            ]
        },
        include: {
            fromUser: true,
            toUser: true,
        },
        orderBy: { timestamp: "desc" },
        skip: 10 * (rowFlag - 1),
        take: 10
    });
    const totalP2PTrans = await prisma.p2pTransfer.count({
        where: {
            OR: [
                { fromUserId: Number(userId) },
                { toUserId: Number(userId) }
            ]
        },
    });

    return { p2pTransfers, totalP2PTrans }

}

export const bankTransactions = async ({ rowFlag = 1, userId }: { rowFlag?: number, userId: string }) => {

    const bankTransfers = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(userId)
        },
        orderBy: { startTime: "desc" },
        skip: 10 * (rowFlag - 1),
        take: 10
    })
    const totalBankTrans = await prisma.onRampTransaction.count({
        where: { userId: Number(userId) },
    });
    return { bankTransfers, totalBankTrans }

}