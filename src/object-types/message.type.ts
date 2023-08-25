import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "./user.type";

@ObjectType()
export class MessageType {
    @Field(()=>ID)
    id : string ;

    @Field(()=>String)
    content : string; 

    senderId : string ;

    @Field(()=>UserType)
    sender : UserType ; 


    recipientId : string ; 

    @Field(()=>UserType)
    recipient : UserType ;

    @Field()
    created_at : Date ; 
}