import axios from "axios";

const PAYSTACK_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function validateAccount(accountNumber: string, bankCode: string) {
    try {
        const response = await axios.get(
            `${PAYSTACK_URL}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            }
        );
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
