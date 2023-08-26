import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "../interfaces/jwt.payload";

export class UserService {
    
    prisma : PrismaClient ;

    constructor(){
        this.prisma = new PrismaClient()
    }

    async findByPayload(payload:JwtPayload):Promise<User>{
        return await this.prisma.user.findUnique({
            where : {
                id : payload.sub , 
            }            
        })
    }
}