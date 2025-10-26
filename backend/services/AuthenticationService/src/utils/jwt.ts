import jwt, { JwtPayload } from "jsonwebtoken";

export const signAccessToken = process.env.ACCESS_TOKEN_SECRET as string;
export const signRefreshToken = process.env.REFRESH_TOKEN_SECRET as string;


export const createAccessToken = (payload: {userId: string})  => {
    return jwt.sign(payload, signAccessToken, {expiresIn: '15m'});
}

export const createRefreshToken = (payload: {userId: string})  => {
    return jwt.sign(payload, signRefreshToken, {expiresIn: '7d'});
}

export const verifyAccessToken = (token:string) => {
    try {
        return jwt.verify(token, signAccessToken) as JwtPayload & { userId: string }; 
    } catch (error) {
        console.error("Token Verification Error:", error);
        return null;
    }
}

export const verifyRefreshToken = (token:string) => {
    try {
        return jwt.verify(token, signRefreshToken) as JwtPayload & { userId: string }; 
    } catch (error) {
        console.error("Token Verification Error:", error);
        return null;
    }
}
