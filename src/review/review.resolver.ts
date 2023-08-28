import { injectable } from "tsyringe";
import { Mutation, Resolver } from "type-graphql";
import { ReviewService } from "./review.service";

@Resolver()
@injectable()
export class ReviewResolver {

    constructor(
        private readonly reviewService:ReviewService ,
    ){}
    
    @Mutation()
    createReview(){

    }
}