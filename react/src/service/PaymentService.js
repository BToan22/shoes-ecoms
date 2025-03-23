import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default class PaymentService {
    async createMomoPayment(amount) {
        try {
            const response = await axios.post(`${API_URL}/momo-payment`, {
                amount,
            });
            if (response.data.payUrl) {
                window.location.href = response.data.payUrl;
            } else {
                throw new Error("Did not receive a payment URL from Momo.");
            }
        } catch (error) {
            console.error("Error creating Momo payment:", error);
            throw error;
        }
    }

    async verifyPayment(queryParams) {
        try {
            const resultCode = queryParams.get("resultCode");
            return resultCode === "0" ? "success" : "failed";
        } catch (error) {
            console.error("Error verifying payment:", error);
            return "error";
        }
    }

    async createCreditCardPayment(amount) {
        try {
            const response = await axios.post(`${API_URL}/stripe/checkout`, {
                amount,
            });
            return response.data;
        } catch (error) {
            console.error("Stripe Payment Error:", error);
            throw error;
        }
    }

    async checkPaymentStatus(sessionId) {
        try {
            const response = await axios.get(
                `${API_URL}/stripe/payment-status`,
                {
                    params: { session_id: sessionId },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error checking payment status:", error);
            return {
                status: "error",
                message: "Unable to check payment status.",
            };
        }
    }

    async createPaymentRecord(orderId, sessionId, amount, paymentMethod) {
        try {
            const response = await axios.post(`${API_URL}/payments`, {
                order_id: orderId,
                session_id: sessionId,
                amount: amount,
                payment_method: paymentMethod,
            });
            return response.data;
        } catch (error) {
            console.error("Error adding payment record:", error);
            throw error;
        }
    }

    async updatePaymentStatus(sessionId, status) {
        try {
            const response = await axios.post(
                `${API_URL}/payments/update-status`,
                {
                    session_id: sessionId,
                    status: status,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error updating payment status:", error);
            throw error;
        }
    }
}
