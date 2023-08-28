import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "../user/user.type";

@ObjectType()
export class ReportType {
    @Field(()=>ID)
    id : string ; 

    userId : string;

    @Field(()=>UserType)
    user : UserType ; 

    @Field()
    created_at : Date ; 
}