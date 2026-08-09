import { NextFunction, Request, Response } from "express";
import { success } from "zod";

export function errorHandler(err: Error,
    req: Request,
    res: Response,
    next: NextFunction) {

    return res.status(500).json({
        success: false,
        message: err.message,
    });
    

}