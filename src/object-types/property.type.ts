import { Field, ID, Int, ObjectType } from "type-graphql";
import { UserType } from "./user.type";

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

    userId : string 

    @Field(()=>UserType)
    Seller : UserType ; 

    favorites : any ;

    Bookings : any ; 

    reviews : any ; 
}