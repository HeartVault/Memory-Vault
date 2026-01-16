import { DomainError } from "../../errors/Errors";


export class Caption {

   private constructor (private readonly value:string){

    }

    static create(input:string) {
        if(typeof input !== 'string'){
            throw new DomainError('Caption must be a string');
        }

        const trimmed = input.trim();

        if(trimmed.length == 0){
            throw new DomainError('Caption cannot be empty');
        }

        if(trimmed.length > 2200){
            throw new DomainError('Caption cannot exceed 2200 characters');
        }

        return new Caption (trimmed);
    }

    getValue() {
        return this.value;
    }

    equals(other: Caption): boolean {
        return this.value === other.value;
    }

}