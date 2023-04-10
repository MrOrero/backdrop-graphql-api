export const formatCustomError = (message: string, statusCode: number) => {
    const formatedError: any = new Error(message);
    formatedError.statusCode = statusCode;
    return formatedError;
};
