import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class StatusResult {
    @Field(()=>String)
    message : string ; 

    @Field(()=>Boolean)
    success : boolean ;

    @Field(()=>String)
    id? : string ;
}