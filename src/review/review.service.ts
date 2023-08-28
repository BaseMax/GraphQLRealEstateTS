import { PrismaClient } from "@prisma/client";
import { StatusResult } from "../utils/status-result.type";
import { inject, injectable } from "tsyringe";

@injectable()
export class ReviewService {
    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient 
    ){}
}