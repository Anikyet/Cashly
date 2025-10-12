import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())
interface WebhookPayload {
    token: string;
    userId: string;
    amount: string
}
app.get("/health", (req, res) => res.status(200).send("OK"));

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation:WebhookPayload = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    const OnRamp = await db.onRampTransaction.findUnique({
        where: {
            token: paymentInformation.token
        }
    });
    if (!OnRamp) {
        return res.status(400).json({
            message: "Invalid token"
        })
    }
    if (OnRamp.status === "Success") {
        return res.status(200).json({
            message: "Already processed"
        })
    }
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.status(200).json({
            message: "Captured"
        })
    } catch (e) {
        await db.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token
            },
            data: {
                status: "Failed",
            }
        });
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})


app.post("/callWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        user_identifier: req.body.userId,
        amount: req.body.amount,
    }
    console.log(paymentInformation)
    try {
        setTimeout(() => {
         fetch("http://localhost:5501/hdfcWebhook", {
            method: "POST",
            headers: {  "Content-Type": "application/json" },
            body: JSON.stringify(paymentInformation)
        });
        }, 200000);
        res.status(200).json({ message: "Transaction Done Succesfully." })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error while completing the transaction" })
    }
})
app.listen(5501);