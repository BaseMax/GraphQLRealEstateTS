import { Prisma, PrismaClient, Review } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IUser } from "../user/user.interface";
import { CreateReviewInput } from "./dto/create-review.input";
import { UpdateReviewInput } from "./dto/update-review.input";
import { ErrorName, ErrorType } from "../utils/errors/http-error";
import { StatusResult } from "../utils/status-result.type";

@injectable()
export class ReviewService {
    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient  , 
    ){}


    async findOne(where : Prisma.ReviewWhereInput){
        const review = await this.prisma.review.findFirst({
            where , 
            include : {
                user : true , 
                property : true , 
            }
        })

        if(!review){
            throw new Error(ErrorName.NOTFOUND);
        }

        return review ;
    }


    async findAll():Promise<Review[]>{
        return await this.prisma.review.findMany({
            include : {
                property : true , 
                user : true , 
            }
        })
    }

    async findAllUserReview(user:IUser):Promise<Review[]>{
        return await this.prisma.review.findMany({
            where : {
                userId : user.id ,
            },
            include : {
                property : true , 
                user : true , 
            }
        })
    }

    async findOneUserReview(id:string , user:IUser):Promise<Review>{
        return await this.prisma.review.findUnique({
            where : {
                id , 
                userId : user.id ,
            }
        })
    }

    async create(user:IUser , createReviewInput:CreateReviewInput):Promise<StatusResult>{
        const {
            comment , 
            rating , 
            propertyId
        } = createReviewInput ; 

        const property = await this.prisma.property.findUnique({where:{id:propertyId}});

        if(!property){
            throw new Error(ErrorName.PROPERTY_NOTFOUND)
        }

        const newReview = await this.prisma.review.create({
            data : {
                propertyId ,
                comment , 
                rating , 
                userId : user.id ,
            }
        });

        return {
            message : 'Item created successfully' ,
            success : true , 
            id : newReview.id , 
        }
    }
    
    async update(id : string , updateReviewInput:UpdateReviewInput , user:IUser):Promise<StatusResult>{
        const review = await this.findOne({
            id ,
            userId : user.id ,
        });


        await this.prisma.review.update({
            where : {id},
            data : {
                ...updateReviewInput , 
            }
        });

        return {
            message : 'Item edited successfully' , 
            success : true , 
        }
    }
    
    async remove(user:IUser , id : string):Promise<StatusResult>{
        await this.findOne({
            id,
            userId : user.id , 
        })

        await this.prisma.review.delete({where : {id}});

        return {
            message : 'Item removed successfully' , 
            success : true ,
        }
    }
}