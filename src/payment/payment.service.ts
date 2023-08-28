import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class Payment {
    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient
    ){}
}