import { DomainError } from "../../errors/Errors";



export class PostId {


   private constructor (private readonly value :string ){

    }


    static create (id:string){
        if(!id) throw new DomainError('PostId cannot be empty');


        const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new DomainError("PostId must be a valid UUID");

    }
    return new PostId(id);

    }

    getValue(){
        return this.value;
    }

    equals(other: PostId): boolean {
        return this.value === other.value;
    }
}