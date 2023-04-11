// formatError is a function that takes a message and a status code and returns an error object with the message and status code
export const formatCustomError = (message: string, statusCode: number) => {
    const formatedError: any = new Error(message);
    formatedError.statusCode = statusCode;
    return formatedError;
};
