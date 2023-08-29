import { Prisma, PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "../auth/jwt/jwt.payload";
import { inject, injectable } from "tsyringe";
import { ErrorName } from "../utils/errors/http-error";

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

    async findOne(where : Prisma.UserWhereInput):Promise<User>{
        const user = await this.prisma.user.findFirst({where}) ;

        if(!user){
            throw new Error(ErrorName.NOTFOUND_USER)
        }

        return user ; 
    }
}