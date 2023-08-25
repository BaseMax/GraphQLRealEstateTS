import { Field, ID, ObjectType } from "type-graphql";

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

    password : string ; 

    reviews : any ; 

    properties : any ; 

    favorites : any ; 

    reports : any ; 

    bookings : any ; 

    messageSent : any ; 

    messagesReceived : any ; 

    notifiactions : any ; 
}