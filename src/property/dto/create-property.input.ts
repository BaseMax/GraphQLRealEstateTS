import { IsNotEmpty, Max } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreatePropertyInput{
    @Field(()=>String)
    @IsNotEmpty()
    title : string ; 

    @Field(()=>String) 
    @IsNotEmpty()
    description : string ;

    @Field(()=>Int)
    @Max(900000)
    price : number

    @Field(()=>String) 
    @IsNotEmpty()
    location : string ; 
}