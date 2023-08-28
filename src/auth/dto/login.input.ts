import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
    @Field(()=>String)
    username : string ; 

    @Field(()=>String)
    password : string ; 
}