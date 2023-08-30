import { injectable } from "tsyringe";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ReviewService } from "./review.service";
import { CreateReviewInput } from "./dto/create-review.input";
import { ContextType } from "../auth/context.type";
import { IUser } from "../user/user.interface";
import { StatusResult } from "../utils/status-result.type";
import { UpdateReviewInput } from "./dto/update-review.input";
import { ReviewType } from "./review.type";

@Resolver()
@injectable()
export class ReviewResolver {

    constructor(
        private readonly reviewService:ReviewService ,
    ){}


    // public 
    @Query(()=>[ReviewType])
    findAllReview(){
        return this.reviewService.findAll();
    }

    @Query(()=>ReviewType)
    findOneReview(
        @Arg('id') id:string
    ){
        return this.reviewService.findOne({id});
    }



    // private 


    @Authorized()
    @Query(()=>ReviewType)
    findOneUserReview( 
        @Arg('id') id : string , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser ; 
        return this.reviewService.findOneUserReview(id , user);
    }



    @Authorized()
    @Query(()=>[ReviewType])
    findAllUserReview( 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser ; 
        return this.reviewService.findAllUserReview(user);
    }


    
    @Authorized()
    @Mutation(()=>StatusResult)
    addPropertyReview(
        @Arg('input') createReviewInput:CreateReviewInput , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser ; 
        return this.reviewService.create(user , createReviewInput);
    }

    
    @Authorized()
    @Mutation(()=>StatusResult)
    updateReview(
        @Arg('input') updateReviewInput:UpdateReviewInput , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser ; 
        return this.reviewService.update(updateReviewInput.id , updateReviewInput , user);
    }

        
    @Authorized()
    @Mutation(()=>StatusResult)
    removeReview(
        @Arg('id') id : string , 
        @Ctx() context:ContextType ,
    ){
        const user = context.req.user as IUser ; 
        return this.reviewService.remove(user , id);
    }

}