// src/utils/errors/http.error.ts
export class HttpException extends Error {
    public readonly statusCode: number;
    public readonly details?: Record<string, unknown>;

    constructor(
        statusCode: number,
        message: string,
        details?: Record<string, unknown>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
