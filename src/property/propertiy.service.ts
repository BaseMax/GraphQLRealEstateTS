import { Prisma, PrismaClient, Property } from "@prisma/client";
import { CreatePropertyInput } from "./dto/create-property.input";
import { StatusResult } from "../utils/status-result.type";
import { ErrorName } from "../utils/errors/http-error";
import { UpdatePropertyInput } from "./dto/update-property.input";
import { IUser } from "../user/user.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class PropertyService {
    constructor(
        @inject('PrismaClient') private readonly prisma:PrismaClient
    ){}


    async findOne(where:Prisma.PropertyWhereInput):Promise<Property>{
        const propertiy = await this.prisma.property.findFirst({
            where , 
            include : {
                reviews : true , 
                seller : true ,
                reports : true ,
            }
        })

        if(!propertiy){
            throw new Error(ErrorName.PROPERTY_NOTFOUND);
        }

        return propertiy ; 
    }

    
    async createUserProperty(user:IUser , createPropertyInput:CreatePropertyInput):Promise<StatusResult>{
        const {
            description , 
            price , 
            location , 
            title , 
        } = createPropertyInput ;

        const newProperty = await this.prisma.property.create({
            data : {
                description , 
                price ,
                location , 
                title ,
                userId : user.id ,
            }
        })


        return {
            success : true , 
            message : 'Item created Successfully' ,
            id : newProperty.id , 
        }
    }

    async findAllUserProperty(user:IUser):Promise<Property[]>{
        return await this.prisma.property.findMany({
            where : {userId : user.id} ,
            include : {
                seller : true , 
                reviews : true ,
            }
        })
    }

    async findOneUserProperty(user:IUser , id : string):Promise<Property>{
        const property = await this.prisma.property.findFirst({
            where : {
                userId : user.id , 
                id 
            } ,
            include : {
                reviews : true ,
                seller : true ,  
            }
        })

        if(!property){
            throw new Error(ErrorName.NOTFOUND)
        }

        return property;
    }

    async updateUserProperty(
        id : string , 
        updatePropertyInput:UpdatePropertyInput , 
        user:IUser
    ):Promise<StatusResult>{
        
        const {
            description , 
            location , 
            price , 
            title , 
        } = updatePropertyInput ;

        await this.findOneUserProperty(user , id);
        await this.prisma.property.update({
            where : {
                id , 
            },
            data  : {
                description , 
                location , 
                price , 
                title , 
            }
        })


        return {
            message : 'Item edited successfully' , 
            success : true , 
        }
    }
}