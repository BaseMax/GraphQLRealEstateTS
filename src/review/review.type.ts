import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "../user/user.type";
import { PropertyType } from "../property/property.type";

@ObjectType()
export class ReviewType {
    @Field(()=>ID)
    id : string ; 

    @Field(()=>String)
    comment : string ; 

    @Field(()=>String)
    rating : string ;

    @Field(()=>PropertyType)
    property : PropertyType ; 

    @Field(()=>UserType)
    user : UserType ;
}