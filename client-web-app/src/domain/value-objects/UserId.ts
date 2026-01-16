
import { DomainError } from "../errors/Errors";

export class UserId {
  private  constructor (private readonly id:string){

    }
    
    static create(id:string){
        if(!id) throw new DomainError('UserId cannot be empty');

         const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      throw new Error("UserId must be a valid UUID");
    }
        return new UserId(id);
    }

    getValue(){
        return this.id;
    }

    equals(other: UserId): boolean {
        return this.id === other.id;
    }


}
