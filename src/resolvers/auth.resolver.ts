import { LoginInput } from "../inputs/login.input";
import { RegisterInput } from "../inputs/register.input";
import { AuthType } from "../object-types/auth.type";
import { AuthService } from "../services/auth.service";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class AuthResolver {
    
    authService : AuthService ; 

    constructor(){
        this.authService = new AuthService()
    }

    @Mutation(()=>AuthType)
    login(@Arg('loginInput' , ()=>LoginInput)  loginInput:LoginInput){
        return this.authService.login(loginInput);
    }
 
    @Mutation(()=>AuthType)
    register(@Arg('registerInput' , ()=>RegisterInput)  registerInput:RegisterInput){
        return this.authService.login(registerInput);
    }
}
