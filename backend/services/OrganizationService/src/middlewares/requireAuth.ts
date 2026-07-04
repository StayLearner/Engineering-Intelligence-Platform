import { Request, Response, NextFunction } from "express";
import {
    verifyAccessToken
} from "@engineering/shared";


export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header missing or malformed",
        });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = verifyAccessToken(token);

    if (!decodedToken) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired access token.",
        });
    }

    req.user = {
        id: decodedToken.userId,
    };

    next();
};