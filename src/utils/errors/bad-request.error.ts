import { HttpException } from './http.error';

export class BadRequestError extends HttpException {
    constructor(message = '非法请求', details?: Record<string, unknown>) {
        super(400, message, details);
    }
}
