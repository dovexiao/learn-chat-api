import { HttpException } from './http.error';

export class NotFoundError extends HttpException {
    constructor(resourceName: string, identifier?: string | number) {
        const message = identifier
            ? `${resourceName} (${identifier}) 未找到`
            : `${resourceName} 不存在`;
        super(404, message, { resource: resourceName, identifier });
    }
}
