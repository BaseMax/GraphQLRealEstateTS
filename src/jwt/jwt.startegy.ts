import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

const jwtOption = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() , 
    secretOrKey : process.env.JWT_SECRET_KEY , 
}

passport.use(new Strategy(jwtOption , (payload)=>{

}))