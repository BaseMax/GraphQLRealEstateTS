import { MessageType } from "../message/message.type";
import { NotificationType } from "../notification/notification.type";
import { Field , ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
    @Field(()=>String)
    id : string ; 

    @Field(()=>String)
    firstName : string ; 

    @Field(()=>String)
    lastName  : string ; 

    @Field(()=>String)
    email : string ; 

    @Field(()=>String)
    username : string ; 

    @Field(()=>[MessageType])
    messageSent : MessageType[] ; 

    @Field(()=>[MessageType])
    messagesReceived : MessageType[] ; 

    @Field(()=>[NotificationType])
    notifiactions : NotificationType[]; 
}