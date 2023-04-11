import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    // checks if statusCode is present in the error object and sets it to 500 if it is not present
    const statusCode = error.statusCode || 500;

    // checks if the statusCode is 500 and returns a generic error message
    if (statusCode === 500) {
        return res.status(statusCode).json({
            message: "Something Unexpected has Occured",
        });
    }

    // if the statusCode is not 500, it returns the error with message and data it was passed
    const message = error.message;
    const data = error.data;
    return res.status(statusCode).json({
        message: message,
        data: data,
    });
};
