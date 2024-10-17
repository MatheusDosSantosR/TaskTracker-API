export class SuccessResponse {
    public status: string;
    public message: string;
    public data: any;

    constructor(message: string, data: any) {
        this.status = 'success';
        this.message = message;
        this.data = data;
    }
}

export class ErrorResponse {
    public status: string;
    public message: string;
    public details: any;

    constructor(message: string, details: any) {
        this.status = 'error';
        this.message = message;
        this.details = details;
    }
}

export class UserError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}