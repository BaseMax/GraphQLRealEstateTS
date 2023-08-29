import { Field, InputType } from "type-graphql";

@InputType()
export class CreateMessageInput {
    @Field(()=>String)
    content : string ;

    @Field(()=>String)
    recipientId : string ; 
}