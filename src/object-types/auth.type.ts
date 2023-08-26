import { Field, ObjectType } from "type-graphql";


@ObjectType()
export class AuthType {
    @Field(()=>String)
    access_token : string ; 

    @Field(()=>[String])
    role? : string [] ;
}