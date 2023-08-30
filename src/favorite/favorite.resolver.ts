import { injectable } from "tsyringe";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { FavoriteService } from "./favorite.service";
import { FavoriteType } from "./favorite.type";
import { IUser } from "../user/user.interface";
import { ContextType } from "../auth/context.type";
import { StatusResult } from "../utils/status-result.type";

@Resolver()
@injectable()
export class FavoriteResolver{
    constructor(
        private readonly favoriteService:FavoriteService
    ){}

    @Authorized()
    @Query(()=>FavoriteType)
    findOneUserFavorite(
        @Arg('id') id:string , 
        @Ctx() context:ContextType
    ){

        const user = context.req.user as IUser
        return this.favoriteService.findOneUserFavorite(user , id);
    }


    @Authorized()
    @Query(()=>[FavoriteType])
    findAllUserFavorite(
        @Arg('id') id:string , 
        @Ctx() context:ContextType
    ){

        const user = context.req.user as IUser
        return this.favoriteService.findAllUserFavorite(user);
    }
    
    
    @Authorized()
    @Mutation(()=>StatusResult)
    addToFavorites(
        @Arg('propertyId') propertyId:string , 
        @Ctx() context:ContextType
    ){

        const user = context.req.user as IUser
        return this.favoriteService.create(propertyId , user);
    }

    @Authorized()
    @Mutation(()=>StatusResult)
    removeFromFavorites(
        @Arg('id') id:string , 
        @Ctx() context:ContextType
    ){

        const user = context.req.user as IUser
        return this.favoriteService.remove(user , id);
    }
}