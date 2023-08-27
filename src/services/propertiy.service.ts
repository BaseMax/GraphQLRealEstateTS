import { PrismaClient, Property, User } from "@prisma/client";
import { CreatePropertyInput } from "../inputs/create-property.input";
import { StatusResult } from "../object-types/status-result.type";

export class PropertyService {
    
    prisma : PrismaClient ; 

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(user , createPropertyInput:CreatePropertyInput):Promise<StatusResult>{
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

    async findAll(user):Promise<Property[]>{
        return await this.prisma.property.findMany({
            where : {userId : user.id} ,
            include : {
                seller : true , 
                reviews : true ,
            }
        })
    }

    async findOne(user , id : string):Promise<Property>{
        return await this.prisma.property.findFirst({
            where : {userId : user.id} ,
            include : {
                reviews : true ,
                seller : true ,  
            }
        })
    }
}