import jwt from 'jsonwebtoken';
import {jwtConfig} from "../config/env";

interface TokenPayload {
    userId: number;
    username: string;
}

interface Tokens {
    accessToken: string;
    refreshToken: string;
    user: TokenPayload;
}


export const generateTokens = (user: TokenPayload): Tokens => {
    const accessToken = jwt.sign(
        { userId: user.userId },
        jwtConfig.secret!,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId: user.userId },
        jwtConfig.refreshSecret!,
        { expiresIn: '7d' }
    );

    return { user, accessToken, refreshToken };
};
