import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotificationService {
    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient
    ){}
}