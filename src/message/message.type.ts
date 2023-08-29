import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "../user/user.type";

@ObjectType()
export class MessageType {
    @Field(()=>ID)
    id : string ;

    @Field(()=>String)
    content : string; 

    @Field(()=>UserType)
    sender : UserType ; 

    @Field(()=>UserType)
    recipient : UserType ;

    @Field()
    created_at : Date ; 
}