import { Favorite, Prisma, PrismaClient } from "@prisma/client";
import { PropertyService } from "../property/propertiy.service";
import { IUser } from "../user/user.interface";
import { ErrorName } from "../utils/errors/http-error";
import { StatusResult } from "../utils/status-result.type";
import { inject, injectable } from "tsyringe";

@injectable()
export class FavoriteService {
    constructor(
        @inject('PrismaClient') 
        private readonly prisma:PrismaClient , 
        private readonly propertyService:PropertyService ,
    ){}

    async findOne(where:Prisma.FavoriteWhereInput):Promise<Favorite>{
        const favorite = await this.prisma.favorite.findFirst({
            where , 
            include : {
                user : true , 
                property : true ,
            }
        })


        if(!favorite){
            throw new Error(ErrorName.NOTFOUND);
        }

        return favorite ; 
    }

    async findAll():Promise<Favorite[]>{
        return await this.prisma.favorite.findMany({
            include : {
                property : true , 
                user : true , 
            }
        })
    }

    async findOneUserFavorite(user:IUser , id:string):Promise<Favorite>{
        return this.findOne({
            id ,
            userId : user.id
        })
    }

    async findAllUserFavorite(user:IUser):Promise<Favorite[]>{
        return this.prisma.favorite.findMany({
            where : {
                userId : user.id ,
            } , 
            include : {
                property : true , 
                user : true , 
            }
        })
    }


    async create(propertyId :string , user:IUser):Promise<StatusResult>{
        await this.propertyService.findOne({id : propertyId});
        
        const newFavorite = await this.prisma.favorite.create({
            data : {
                propertyId , 
                userId : user.id ,
            }
        })

        return {
            message : 'Item created successfully' ,
            success : true , 
            id : newFavorite.id , 
        }
    }

    async remove(user:IUser , id:string ):Promise<StatusResult>{
        await this.findOne({
            id , 
            userId : user.id ,
        })

        await this.prisma.favorite.delete({where:{id}});
        
        return {
            message : 'Item removed successfully' ,
            success : true , 
        }
    }
}