import { resolvers } from "../graphql/resolvers";
import User from "../model/user";

User.findByPk = jest.fn();

const getAccountNameData = {
    id: "1",
    bankCode: "123",
    accountNumber: "1234567890",
};

describe("getAccountName", () => {
    // Reset mock functions before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return the account name in sentence case from user account_name property", async () => {
        // Mock the user object
        const user = { id: 1, account_number: "1234567890", account_name: "JOHN DOE" };

        (User.findByPk as jest.Mock).mockResolvedValue(user);

        // Call the resolver
        const result = await resolvers.Query.getAccountName(
            {},
            { getAccountNameData: getAccountNameData },
            {}
        );

        // Check the returned result
        expect(User.findByPk).toBeCalledWith("1");
        expect(result).toEqual("John Doe");
    });

    it("should return the account name in sentence case from PayStack if user account_name property is not set", async () => {
        // Mock the user object
        const user = { id: 1, account_number: "2113405284", account_name: null };

        (User.findByPk as jest.Mock).mockResolvedValue(user);

        // Call the resolver
        const result = await resolvers.Query.getAccountName(
            {},
            { getAccountNameData: { id: "1", bankCode: "033", accountNumber: "2113405284" } },
            {}
        );

        // Check the returned result
        expect(User.findByPk).toBeCalledWith("1");
        expect(result).toEqual("Ozore Orero Oluchukwu");
    }, 20000);

    it("should throw an error if user not found", async () => {
        // Mock User.findByPk to return null

        (User.findByPk as jest.Mock).mockResolvedValue(null);

        // Call the resolver and expect it to throw an error
        await expect(
            resolvers.Query.getAccountName({}, { getAccountNameData: getAccountNameData }, {})
        ).rejects.toThrowError("User not found");
    });

    it("should throw an error if account number does not match", async () => {
        const user = { id: 1, account_number: "2113405200", account_name: "JOHN DOE" };

        (User.findByPk as jest.Mock).mockResolvedValue(user);

        await expect(
            resolvers.Query.getAccountName({}, { getAccountNameData: getAccountNameData }, {})
        ).rejects.toThrowError("Account number does not match");
    });
});
