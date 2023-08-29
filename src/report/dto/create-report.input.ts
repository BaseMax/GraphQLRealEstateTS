import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class CreateReportInput {
    @Field(()=>String)
    @IsNotEmpty()
    text : string ; 

    @Field(()=>String)
    @IsNotEmpty()
    propertyId : string ; 
}