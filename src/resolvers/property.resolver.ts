import { CreatePropertyInput } from "../inputs/create-property.input";
import { ContextType } from "../interfaces/context.type";
import { PropertyType } from "../object-types/property.type";
import { StatusResult } from "../object-types/status-result.type";
import { PropertyService } from "../services/propertiy.service";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PropertyResolver {

    propertyService : PropertyService ; 

    constructor(){
        this.propertyService = new PropertyService()
    }

    @Authorized()
    @Query(()=>[PropertyType])
    findAllProperty(@Ctx() context:ContextType){
        return this.propertyService.findAll(context.req.user)
    }


    @Authorized()
    @Query(()=>PropertyType)
    findOneProperty(
        @Ctx() context:ContextType ,
        @Arg('id' , ()=>String) id : string 
        ){
        const user = context.req.user;
        return this.propertyService.findOne(user , id)
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    createProperty(
        @Ctx() context:ContextType ,
        @Arg('createPropertyInput' , ()=>CreatePropertyInput) createPropertyInput:CreatePropertyInput 
        ){

        const user = context.req.user;
        return this.propertyService.create(user,createPropertyInput)
    }
}