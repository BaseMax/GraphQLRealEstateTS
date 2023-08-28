import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateReviewInput{
    @Field(()=>String)
    id : string ;

    @Field(()=>String)
    comment : string ; 

    @Field(()=>String)
    rating : string ;
}