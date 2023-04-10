import User from "../model/user";

export const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
    Mutation: {
        createUser: async (parent: any, { accountName }: { accountName: string }, info: any) => {
            try {
                const user = await User.create({ account_name: accountName });
                return user;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
};
