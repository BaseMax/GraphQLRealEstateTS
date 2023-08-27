import { Field, ID, Int, ObjectType } from "type-graphql";
import { UserType } from "./user.type";
import { ReviewType } from "./review.type";

@ObjectType()
export class PropertyType { 
    @Field(()=>ID)
    id : string ; 

    @Field(()=>[String])
    images : string[]

    @Field(()=>String)
    title : string ; 
    
    @Field(()=>String)
    description : string;

    @Field(()=>Int)
    price : number; 

    @Field(()=>String)
    location : string ; 

    @Field(()=>UserType)
    seller : UserType ; 

    @Field(()=>[ReviewType])
    reviews : ReviewType[]; 
}