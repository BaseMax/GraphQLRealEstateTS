import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateMessageInput {
    @Field(()=>String)
    id : string ; 

    @Field(()=>String)
    content : string ; 
}