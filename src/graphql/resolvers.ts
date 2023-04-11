import User from "../model/user";
import calculateLevenDistance from "../util/calculate-leven-distance";
import { formatCustomError } from "../util/format-error";
import { validateAccount, toSentenceCase } from "../util/helper-methods";

// Interdfaces used in the resolvers for type checking
interface BankDetails {
    id: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
}

interface PayStackUserdata {
    account_number: string;
    account_name: string;
    bank_id: number;
}

interface GetAccountNameData {
    id: string;
    bankCode: string;
    accountNumber: string;
}

// Resolvers
export const resolvers = {
    Query: {
        // Get the account name of a user using the account number and bank code
        getAccountName: async (
            parent: any,
            { getAccountNameData }: { getAccountNameData: GetAccountNameData },
            info: any
        ) => {
            try {
                const { id, bankCode, accountNumber } = getAccountNameData;
                const user = await User.findByPk(id);

                // Throw an error if the user is not found
                if (!user) {
                    throw formatCustomError("User not found", 404);
                }

                // Throws an error if the user's saved account number does not match the account number provided
                // This is to prevent a user from getting the account details of another user
                if (user.account_number !== accountNumber) {
                    throw formatCustomError("Account number does not match", 400);
                }

                // Returns the account name the user previously inputed in sentence case
                if (user.account_name) {
                    return toSentenceCase(user.account_name);
                }

                // If the user's account name is not set, we get the account name from paystack and return it in sentence case
                const payStackUserdata: PayStackUserdata = await validateAccount(
                    accountNumber,
                    bankCode
                );

                return toSentenceCase(payStackUserdata.account_name);
            } catch (error) {
                throw error;
            }
        },
    },
    Mutation: {
        // Create a new user in the database
        createUser: async (parent: any, { userName }: { userName: string }, info: any) => {
            try {
                // Check if the user already exists
                const userExists = await User.findOne({ where: { user_name: userName } });
                if (userExists) {
                    throw formatCustomError("User already exists", 400);
                }

                // Create a new user and return it
                const user = await User.create({ user_name: userName });
                return user;
            } catch (error) {
                throw error;
            }
        },

        // Add bank details to a registered user
        addBankDetails: async (
            parent: any,
            { bankDetails }: { bankDetails: BankDetails },
            info: any
        ) => {
            try {
                const { id, bankCode, accountNumber, accountName } = bankDetails;
                const user = await User.findByPk(id);

                // Throw an error if the user is not found
                if (!user) {
                    throw formatCustomError("User not found", 404);
                }

                // Throw an error if the user is already verified because that means the user has already added bank details
                if (user.is_verified) {
                    throw formatCustomError("User is already verified", 400);
                }

                // Validate the account number and bank code using paystack
                const payStackUserdata: PayStackUserdata = await validateAccount(
                    accountNumber,
                    bankCode
                );

                // Calculate the Levenstein distance between the account name the user inputed and the account name gotten from paystack
                // and throws an error if the distance is greater than 2
                if (
                    calculateLevenDistance(
                        payStackUserdata.account_name.toLowerCase(),
                        accountName.toLowerCase()
                    ) > 2
                ) {
                    throw formatCustomError("Account name does not match", 400);
                }

                // Update the user's bank details and set the user to verified
                user.bank_code = bankCode;
                user.account_number = accountNumber;
                user.account_name = accountName;
                user.is_verified = true;

                // Save the user and return it
                await user.save();
                return user;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
