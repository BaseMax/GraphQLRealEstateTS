import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNotificationInput {
    @Field(()=>String)
    message : string ;
     
    @Field(()=>String)
    userId : string ; 
}