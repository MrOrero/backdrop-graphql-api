import axios from "axios";

const PAYSTACK_URL = "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Get the account name of a user using the account number and bank code by making a request to paystack
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

export function toSentenceCase(name: String) {
    // Split the input string by whitespaces
    const words = name.split(/\s+/);

    // Loop through each word and capitalize the first letter
    const result = words.map(word => {
        // Trim leading and trailing whitespace
        word = word.trim();

        // Capitalize the first letter and convert the rest to lowercase
        if (word.length > 0) {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        } else {
            return word;
        }
    });

    // Join the words back into a single string
    return result.join(" ");
}
