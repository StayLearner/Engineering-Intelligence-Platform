import jwt from "jsonwebtoken";

export const signAccessToken = process.env.ACCESS_TOKEN_SECRET as string;
export const signRefreshToken = process.env.REFRESH_TOKEN_SECRET as string;


export const createAccessToken = (payload: {userId: string})  => {
    return jwt.sign(payload, signAccessToken, {expiresIn: '15m'});
}

export const createRefreshToken = (payload: {userId: string})  => {
    return jwt.sign(payload, signRefreshToken, {expiresIn: '7d'});
}

