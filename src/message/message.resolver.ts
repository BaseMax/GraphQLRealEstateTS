import { injectable } from "tsyringe";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MessageService } from "./message.service";
import { ContextType } from "../auth/context.type";
import { IUser } from "../user/user.interface";
import { CreateMessageInput } from "./dto/create-message.input";
import { UpdateMessageInput } from "./dto/edit-message.input";
import { StatusResult } from "../utils/status-result.type";
import { MessageType } from "./message.type";

@Resolver()
@injectable()
export class MessageResolver {
    constructor(
        private readonly messageService:MessageService ,
    ) {} 

    @Authorized()
    @Query(()=>MessageType)
    findOneUserSent(@Arg('id') id:string , @Ctx() context :ContextType){
        const user = context.req.user as IUser ; 
        return this.messageService.findOneUserSent(user , id)
    }


    @Authorized()
    @Query(()=>MessageType)
    findOneUserReceived(@Arg('id') id:string , @Ctx() context :ContextType){
        const user = context.req.user as IUser ; 
        return this.messageService.findOneUserReceived(user , id)
    }

    @Authorized()
    @Query(()=>[MessageType])
    findAllUserSent(@Ctx() context :ContextType){
        const user = context.req.user as IUser ; 
        return this.messageService.findAllUserSent(user)
    }

    @Authorized()
    @Query(()=>[MessageType])
    findAllUserReceived(@Ctx() context :ContextType){
        const user = context.req.user as IUser ; 
        return this.messageService.findAllUserReceived(user)
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    sendMessage(
        @Arg('input') createMessageInput:CreateMessageInput ,
        @Ctx() context :ContextType
    ){
        const user = context.req.user as IUser ; 
        return this.messageService.create(user , createMessageInput);
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    updateMessage(
        @Arg('input') updateMessageInput:UpdateMessageInput ,
        @Ctx() context :ContextType
    ){
        const user = context.req.user as IUser ; 
        return this.messageService.update(user , updateMessageInput.id ,updateMessageInput);
    }

    
    @Authorized()
    @Mutation(()=>StatusResult)
    removeMessage(
        @Arg('id') id:string ,
        @Ctx() context :ContextType
    ){
        const user = context.req.user as IUser ; 
        return this.messageService.remove(user , id);
    }

    

}