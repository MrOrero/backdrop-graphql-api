import User from "../model/user";
import calculateLevenDistance from "../util/calculate-leven-distance";
import { formatCustomError } from "../util/format-error";
import { validateAccount } from "../util/validate-account";

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

export const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
    Mutation: {
        createUser: async (parent: any, { userName }: { userName: string }, info: any) => {
            try {
                const user = await User.create({ user_name: userName });
                return user;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        addBankDetails: async (
            parent: any,
            { bankDetails }: { bankDetails: BankDetails },
            info: any
        ) => {
            try {
                const { id, bankCode, accountNumber, accountName } = bankDetails;
                const user = await User.findByPk(id);
                if (!user) {
                    throw formatCustomError("User not found", 404);
                }

                if (user.is_verified) {
                    throw formatCustomError("User is already verified", 400);
                }

                const payStackUserdata: PayStackUserdata = await validateAccount(
                    accountNumber,
                    bankCode
                );

                if (
                    calculateLevenDistance(
                        payStackUserdata.account_name.toLowerCase(),
                        accountName.toLowerCase()
                    ) > 2
                ) {
                    throw formatCustomError("Account name does not match", 400);
                }

                user.bank_code = bankCode;
                user.account_number = accountNumber;
                user.account_name = accountName;
                user.is_verified = true;
                await user.save();
                return user;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
