import { UpdatePropertyInput } from "./dto/update-property.input";
import { CreatePropertyInput } from "./dto/create-property.input";
import { ContextType } from "../auth/context.type";
import { PropertyType } from "./property.type";
import { StatusResult } from "../utils/status-result.type";
import { PropertyService } from "./propertiy.service";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { IUser } from "../user/user.interface";
import { injectable } from "tsyringe";

@Resolver()
@injectable()
export class PropertyResolver {

    constructor(
        private readonly propertyService:PropertyService
    ){}

    @Authorized()
    @Query(()=>[PropertyType])
    findAllProperty(@Ctx() context:ContextType){
        const user =context.req.user as IUser ;

        return this.propertyService.findAllUserProperty(user)
    }


    @Authorized()
    @Query(()=>PropertyType)
    findOneProperty(
        @Ctx() context:ContextType ,
        @Arg('id' , ()=>String) id : string 
        ){
        const user = context.req.user as IUser;
        return this.propertyService.findOneUserProperty(user , id)
    }


    @Authorized()
    @Mutation(()=>StatusResult)
    createProperty(
        @Ctx() context:ContextType ,
        @Arg('input') createPropertyInput:CreatePropertyInput 
        ){

        const user = context.req.user as IUser;
        return this.propertyService.createUserProperty(user,createPropertyInput)
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    updateProperty(
        @Ctx() context:ContextType ,
        @Arg('input') updatePropertyInput:UpdatePropertyInput 
        ){

        const user = context.req.user as IUser;

        return this.propertyService.updateUserProperty(
            updatePropertyInput.id , 
            updatePropertyInput , 
            user ,
        )
    }
}