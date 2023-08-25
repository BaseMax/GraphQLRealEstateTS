import { Field, ID, ObjectType } from "type-graphql";
import { UserType } from "./user.type";

@ObjectType()
export class ReviewType {
    @Field(()=>ID)
    id : string ; 

    @Field(()=>String)
    comment : string ; 

    @Field(()=>String)
    rating : string ; 

    @Field(()=>String)
    userId : string ; 

    @Field(()=>UserType)
    user : UserType ;

    @Field(()=>String)
    propertyId : string ; 

    property : any ; 
}