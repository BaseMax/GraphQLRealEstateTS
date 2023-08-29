import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "../user/user.type";
import { PropertyType } from "../property/property.type";

@ObjectType()
export class ReportType {
    @Field(()=>String)
    text : string ; 

    @Field(()=>ID)
    id : string ; 

    @Field(()=>UserType)
    user : UserType ;
    
    @Field(()=>PropertyType)
    property : PropertyType ; 

    @Field()
    created_at : Date ; 
}