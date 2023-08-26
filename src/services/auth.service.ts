import { Role } from "../enums/role.enum";
import { ErrorName } from "../errors/http-error";
import { LoginInput } from "../inputs/login.input";
import { RegisterInput } from "../inputs/register.input";
import { JwtPayload } from "../interfaces/jwt.payload";
import { AuthType } from "../object-types/auth.type";
import { PrismaClient } from "@prisma/client";
import { compare, compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthService {
    prisma:PrismaClient ; 
    
    constructor(){
        this.prisma = new PrismaClient()
    }

    private async _signToken(payload:JwtPayload):Promise<string>{
        return sign(
            payload , 
            process.env.JWT_SECRET_KEY , 
            {
                expiresIn : process.env.TOKEN_EXPIRE
            }
        )
    }
    
    async login(loginInput:LoginInput):Promise<AuthType>{
        const {
            username , 
            password , 
        } = loginInput ; 

        const user = await this.prisma.user.findUnique({where : {username}});

        if(!user){
            throw new Error(ErrorName.INVALID_USERNAME) ;
        }

        if(!compareSync(password , user.password)){
            throw new Error(ErrorName.PASSWORD_ERROR); 
        }

        const payload:JwtPayload= {
            roles : user.roles , 
            username : user.username , 
            sub : user.id    
        }

        const token = await this._signToken(payload) ; 

        return {
            access_token : token , 
            role : user.roles , 
        }
    }

    async register(registerInput:RegisterInput):Promise<AuthType>{
        let { 
            email , 
            firstName, 
            lastName ,
            password, 
            username , 
        } = registerInput ;

        const roles:Role[] = [Role.USER];
        const userByEmail = await this.prisma.user.findUnique({where : {email}});
        const userByUsername = await this.prisma.user.findUnique({where : {username}});

        if(userByEmail){
            throw new Error(ErrorName.USER_ALREADY_EXISTS)
        }
        
        
        if(userByUsername){
            throw new Error(ErrorName.USER_ALREADY_EXISTS)
        }


        // hash password
        password = hashSync(password , 12) ; 

    
        const countUser = await this.prisma.user.count();

        if(countUser === 1){
            roles.push(Role.ADMIN)
        }

        const newUser = await this.prisma.user.create({
            data : {
                email , 
                username , 
                password , 
                firstName , 
                lastName , 
                roles , 
            }
        })


        const payload:JwtPayload = {
            sub : newUser.id , 
            username : newUser.username , 
            roles : newUser.roles , 
        }

        const token = await this._signToken(payload);

        return {
            access_token : token , 
            role : newUser.roles 
        }
    }
}