import { resolvers } from "../graphql/resolvers";
import User from "../model/user";

interface UserAttributes {
    id?: string;
    user_name: string;
    account_name?: string;
    bank_code?: string;
    account_number?: string;
    is_verified?: boolean;
    save: () => Promise<void>;
}

User.findByPk = jest.fn();
const user: UserAttributes = {
    id: "1",
    user_name: "John Doe",
    is_verified: false,
    save: jest.fn(), // Mock the save method
};

describe("getAccountName", () => {
    // Reset mock functions before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should add bank details and return user if Levenstein Distance is less than 2", async () => {
        // Mock data
        const bankDetails = {
            id: "1",
            bankCode: "033",
            accountNumber: "2113405284",
            // accountName is different from the account name returned by PayStack within Levenstein Distance of 2
            accountName: "Ozore Orero Oluchukw",
        };

        // Mock User.findByPk to return the user
        (User.findByPk as jest.Mock).mockResolvedValue(user);

        // Call the resolver
        const result = await resolvers.Mutation.addBankDetails({}, { bankDetails }, {});

        // Check if User.findByPk was called with the correct arguments
        expect(User.findByPk).toHaveBeenCalledWith(bankDetails.id);

        // Check if user.bank_code, user.account_number, user.account_name, and user.is_verified were updated
        expect(user.bank_code).toEqual(bankDetails.bankCode);
        expect(user.account_number).toEqual(bankDetails.accountNumber);
        expect(user.account_name).toEqual(bankDetails.accountName);
        expect(user.is_verified).toEqual(true);

        // Check if user.save was called
        expect(user.save).toHaveBeenCalled();

        // Check if the resolver function returned the user object
        expect(result).toEqual(user);
    });

    it("should throw an error if user not found", async () => {
        // Mock User.findByPk to return null
        (User.findByPk as jest.Mock).mockResolvedValue(null);

        // Call the resolver
        const result = resolvers.Mutation.addBankDetails(
            {},
            {
                bankDetails: {
                    id: "1",
                    bankCode: "033",
                    accountNumber: "2113405284",
                    accountName: "Ozore Orero Oluchukwu",
                },
            },
            {}
        );

        // Check if the resolver function threw an error
        await expect(result).rejects.toThrow("User not found");
        expect(user.save).not.toHaveBeenCalled();
    });

    it("should throw an error if user is already verified", async () => {
        // Mock data
        const bankDetails = {
            id: "1",
            bankCode: "033",
            accountNumber: "2113405284",
            accountName: "Ozore Orero Oluchukwu",
        };
        const user: UserAttributes = {
            id: "1",
            user_name: "John Doe",
            is_verified: true,
            save: jest.fn(), // Mock the save method
        };

        // Mock User.findByPk to return the user
        (User.findByPk as jest.Mock).mockResolvedValue(user);

        // Call the resolver
        const result = resolvers.Mutation.addBankDetails({}, { bankDetails }, {});

        // Check if the resolver function threw an error
        await expect(result).rejects.toThrow("User is already verified");
        expect(user.save).not.toHaveBeenCalled();
    });

    it("should throw an error if Levenstein Distance is greater than 2", async () => {
        // Mock data
        const bankDetails = {
            id: "1",
            bankCode: "033",
            accountNumber: "2113405284",
            // accountName is different from the account name returned by PayStack with Levenstein Distance greater than 2
            accountName: "Ozore Orero",
        };

        // Mock User.findByPk to return the user
        user.is_verified = false;
        (User.findByPk as jest.Mock).mockResolvedValue(user);

        // Call the resolver
        const result = resolvers.Mutation.addBankDetails({}, { bankDetails }, {});

        // Check if the resolver function threw an error
        await expect(result).rejects.toThrow("Account name does not match");
        expect(user.save).not.toHaveBeenCalled();
    }, 20000);
});
