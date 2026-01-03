

export class DomainError extends Error{
    constructor(message:String){
        super(message as string);
        this.name = 'Domain ERror'
    }
}

export class AuthError extends Error {
    constructor (message:String) {
        super(message as string);
        this.name = 'Auth Error'
    }
}

export class UnauthorizedError extends DomainError {
    constructor(message:String){
        super(message as string);
        this.name = 'UnAuthorized Error'
    }
}

export class ValidationError extends DomainError {
    constructor(message:String){
        super(message as string);
        this.name = 'UnAuthorized Error'
    }
}

export class NotFoundError extends DomainError {
    constructor(message:String){
        super(message as string);
        this.name = 'UnAuthorized Error'
    }
}