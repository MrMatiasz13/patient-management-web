export class AuthError extends Error {
    name: string;
    message: string;

    constructor(message: string) {
        super();
        this.name = "AuthError";
        this.message = message;
    }
}   