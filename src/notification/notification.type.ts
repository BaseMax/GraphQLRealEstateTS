import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "../user/user.type";

@ObjectType()
export class NotificationType {
    @Field(()=>ID)
    id : string; 

    @Field(()=>String)
    message : string ; 

    userId : string ; 

    @Field(()=>UserType)
    user : UserType ;

    @Field()
    created_at : Date;
}