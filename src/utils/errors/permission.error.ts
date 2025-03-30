import { HttpException } from './http.error';

export class PermissionError extends HttpException {
    constructor(action = '执行该操作') {
        super(403, `您没有权限${action}`);
    }
}
