import jwt from 'jsonwebtoken';
import {jwtConfig} from "../config/env";

interface TokenPayload {
    userId: number;
    username: string;
}

interface Tokens {
    accessToken: string;
    refreshToken: string;
}


export const generateTokens = (user: TokenPayload): Tokens => {
    const accessToken = jwt.sign(
        { userId: user.userId },
        jwtConfig.secret!,
        { expiresIn: '2h' }
    );

    const refreshToken = jwt.sign(
        { userId: user.userId },
        jwtConfig.refreshSecret!,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};
