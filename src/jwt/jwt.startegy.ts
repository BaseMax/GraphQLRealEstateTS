import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../services/user.service";
import { ErrorName } from "../errors/http-error";


const userService = new UserService

const jwtOption = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() , 
    secretOrKey : process.env.JWT_SECRET_KEY , 
}

passport.use(new Strategy(jwtOption , async (payload , done)=>{
    const user = await userService.findByPayload(payload) ;

    if(!user){
        return done(Error(ErrorName.UNAUTHORIZED) , false)
    }

    return done(null , user);
}))