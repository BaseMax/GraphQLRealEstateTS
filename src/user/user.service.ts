import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "../auth/jwt/jwt.payload";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService {

    constructor(
        @inject('PrismaClient')
        private readonly prisma:PrismaClient
    ){}

    async findByPayload(payload:JwtPayload):Promise<User>{
        return await this.prisma.user.findUnique({
            where : {
                id : payload.sub , 
            }            
        })
    }
}