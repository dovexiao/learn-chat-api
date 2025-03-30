import { HttpException } from './http.error';

export class AuthenticationError extends HttpException {
    constructor(
        message = '身份验证失败',
        public details?: {
            code?: 'INVALID_TOKEN' | 'EXPIRED_TOKEN' | 'MISSING_CREDENTIALS' | 'REFRESH_EXPIRED';
            [key: string]: unknown;
        }
    ) {
        super(401, message, details);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
