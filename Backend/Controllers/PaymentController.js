import crypto from "crypto";

export const initiatePayment = (req, res) => {
  try {
    const { email, amount, productName } = req.body;

    const transaction_uuid = Date.now().toString();
    const productCode = "EPAYTEST";
    const secretKey = "8gBm/:&EnhH.1/q";

    const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(message)
      .digest("base64");

    res.status(200).json({
      amount,
      transaction_uuid,
      productCode,
      signature,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Payment initialization failed",
    });
  }
};