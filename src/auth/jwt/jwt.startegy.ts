import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ErrorName } from "../../utils/errors/http-error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const jwtOption = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() , 
    secretOrKey : process.env.JWT_SECRET_KEY , 
}

passport.use(new Strategy(jwtOption , async (payload , done)=>{
    const user = await prisma.user.findUnique({where:{id : payload.sub}})

    if(!user){
        return done(Error(ErrorName.UNAUTHORIZED) , false)
    }

    return done(null , user);
}))