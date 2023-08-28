import { injectable } from "tsyringe";
import { LoginInput } from "./dto/login.input";
import { RegisterInput } from "./dto/register.input";
import { AuthType } from "./auth.type";
import { AuthService } from "./auth.service";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
@injectable()
export class AuthResolver {

    constructor(
        private readonly authService:AuthService , 
    ){}

    @Mutation(()=>AuthType)
    login(@Arg('input') loginInput:LoginInput){
        return this.authService.login(loginInput);
    }
 
    @Mutation(()=>AuthType)
    register(@Arg('input')  registerInput:RegisterInput){
        return this.authService.register(registerInput);
    }
}
