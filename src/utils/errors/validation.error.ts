import { HttpException } from './http.error';

export class ValidationError extends HttpException {
    constructor(message = '参数校验失败', details?: Record<string, unknown>) {
        super(400, message, details);
    }
}
