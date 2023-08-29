import { Message, Prisma, PrismaClient } from "@prisma/client";
import { IUser } from "../user/user.interface";
import { inject, injectable } from "tsyringe";
import { CreateMessageInput } from "./dto/create-message.input";
import { UserService } from "../user/user.service";
import { StatusResult } from "../utils/status-result.type";
import { UpdateMessageInput } from "./dto/edit-message.input";
import { ErrorName } from "../utils/errors/http-error";

@injectable()
export class MessageService {
    constructor(
        @inject('PrismaClient') 
        private readonly prisma:PrismaClient ,
        private readonly userService:UserService , 
    ){}


    async findOneUserReceived(user:IUser ,  id:string):Promise<Message>{
        return await this.findOne({
            id , 
            recipientId : user.id 
        })
    }

    async findAllUserReceived(user:IUser):Promise<Message[]>{
        return await this.prisma.message.findMany({
            where : {
                recipientId : user.id , 
            } , 
            include : {
                recipient : true , 
                sender : true 
            }
        })
    }


    async findOneUserSent(user:IUser ,  id:string):Promise<Message>{
        return await this.findOne({
            id , 
            senderId : user.id 
        })
    }

    async findAllUserSent(user:IUser):Promise<Message[]>{
        return await this.prisma.message.findMany({
            where : {
                senderId : user.id , 
            } , 
            include : {
                recipient : true , 
                sender : true 
            }
        })
    }

    async findOne(where:Prisma.MessageWhereInput):Promise<Message>{
        const message = await this.prisma.message.findFirst({
            where , 
            include : {
                recipient : true , 
                sender : true , 
            }
        })

        if(!message){
            throw new Error(ErrorName.NOTFOUND_MESSAGE)
        }

        return message ; 
    }

    async create(user:IUser , createMessageInput:CreateMessageInput):Promise<StatusResult>{
        const {
            content , 
            recipientId , 
        } = createMessageInput ;


        // check user exist 
        await this.userService.findOne({id:recipientId});
        
        
        const newMessage = await this.prisma.message.create({
            data : {
                senderId : user.id , 
                content , 
                recipientId         
            }
        })


        return {
            message : 'Item created successfully' , 
            success : true , 
            id : newMessage.id
        }
    }

    async update(user:IUser , id:string , updateMessageInput:UpdateMessageInput):Promise<StatusResult>{
        const {
            content
        } = updateMessageInput ; 

        
        await this.findOne({
            senderId : user.id , 
            id , 
        })

        await this.prisma.message.update({
            where : {id} , 
            data : {
                content 
            }
        })

        return {
            message : 'Item edited successfully' , 
            success : true ,
        }
    }

    async remove(user:IUser , id:string):Promise<StatusResult>{
        await this.findOne({
            id , 
            senderId : user.id , 
        })

        await this.prisma.message.delete({where:{id}});

        return {
            message : 'Item removed successfully' , 
            success : true 
        }
    }
}