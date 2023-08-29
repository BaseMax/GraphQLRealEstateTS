import { InputType } from "type-graphql";

@InputType()
export class CreateNotificationInput {
    message : string ;
     
    
    userId : string ; 
}