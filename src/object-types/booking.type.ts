import { Field, ID} from "type-graphql";
import { UserType } from "./user.type";
import { PropertyType } from "./property.type";

export class BookingType {
    @Field(()=>ID)
    id : string ; 

    payments : any ; 

    @Field()
    start_date : Date; 

    @Field()
    end_date : Date ;

    @Field()
    created_at : Date ; 

    userId : string ; 

    @Field(()=>UserType)
    user : UserType ;


    propertyId : string ;

    @Field(()=>PropertyType)
    property : PropertyType ; 
}