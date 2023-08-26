import { ContextType } from "../interfaces/context.type";
import { UserType } from "../object-types/user.type";
import { Authorized, Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResovler {

    @Authorized()
    @Query(()=>UserType)
    me(@Ctx() context:ContextType){
        return context.req.user ; 
    }
}