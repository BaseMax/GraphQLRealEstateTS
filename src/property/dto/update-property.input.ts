import { Field, ID, InputType } from "type-graphql";
import { CreatePropertyInput } from "./create-property.input";

@InputType()
export class UpdatePropertyInput extends CreatePropertyInput {
    @Field(()=>ID)
    id : string ;
}