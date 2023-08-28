import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateReviewInput{
    @Field(()=>String)
    @IsNotEmpty()
    comment : string ; 

    @Field(()=>String)
    @IsNotEmpty()
    propertyId : string ; 

    @Field(()=>String)
    @IsNotEmpty()
    rating : string ; 
}