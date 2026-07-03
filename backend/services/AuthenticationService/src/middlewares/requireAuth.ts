import { Request, Response, NextFunction } from 'express';
import {
    generateAccessToken,
    verifyAccessToken
} from "@engineering/shared";


declare global{
    namespace Express{
        interface Request{
            user?:{ id: string;}
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader= req.headers.authorization; // Bearer token

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decodedToken = verifyAccessToken(token);

    if(!decodedToken){
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired access token.' });
    }

    req.user = { id: decodedToken.id };

    next();
}