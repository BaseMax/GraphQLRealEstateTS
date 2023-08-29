import { PrismaClient } from "@prisma/client";
import { IUser } from "../user/user.interface";
import { StatusResult } from "src/utils/status-result.type";
import { inject, injectable } from "tsyringe";

@injectable()
export class NotificationService {
    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient
    ){}

}