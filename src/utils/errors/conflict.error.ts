import { HttpException } from './http.error';

export class ConflictError extends HttpException {
    constructor(
        resourceName: string,
        conflictField: string,
        conflictValue: string | number
    ) {
        super(409, `${resourceName} ${conflictField}${conflictValue} 已存在`, {
            resource: resourceName,
            field: conflictField,
            value: conflictValue,
        });
    }
}
