import { Field, ObjectType } from "type-graphql";
import { UserType } from "../user/user.type";
import { PropertyType } from "../property/property.type";

@ObjectType()
export class FavoriteType {
    @Field(()=>String)
    id : string ; 

    // hidden 
    userId : string ;

    @Field(()=>UserType)
    user : UserType;

    // hidden
    propertyId : string ; 

    @Field(()=>PropertyType)
    property : PropertyType ;

}