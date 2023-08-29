import { injectable } from "tsyringe";
import { ContextType } from "../auth/context.type";
import { UserType } from "./user.type";
import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { UserService } from "./user.service";

@Resolver()
@injectable()
export class UserResovler {

    constructor(
        private readonly userService:UserService , 
    ){}

    @Authorized()
    @Query(()=>UserType)
    me(@Ctx() context:ContextType){
        console.log(context.req.user)
        return context.req.user ; 
    }
}