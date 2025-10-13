const WEBHOOK_URL =
  process.env.BANK_WEBHOOK_URL || "http://localhost:5501/hdfcWebhook";
  

export const callingWebhook = (paymentInformation:any) => {
  try {
    setTimeout(() => {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentInformation),
      });
    }, 60000);

    return { message: "Transaction in process" };
  } catch (e) {
    console.error(e);
    return { message: "Error while processing the transaction" };
  }
};
