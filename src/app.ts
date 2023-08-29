import "reflect-metadata";
import './auth/jwt/jwt.startegy';

import express from 'express';
import passport from "passport";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";

import { authChecker } from "./auth/auth.middleware";

import path from 'path';
import { container } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { ErrorName, getErrorCode } from "./utils/errors/http-error";

// Resolvers
import { ReviewResolver } from "./review/review.resolver";
import { ReportResolver } from "./report/report.resolver";
import { AuthResolver } from "./auth/auth.resolver";
import { UserResovler } from "./user/user.resolver";
import { PropertyResolver } from "./property/property.resolver";

(async ()=>{
    container.register<PrismaClient>("PrismaClient", {
        useValue: new PrismaClient(),
    });

    const app = express()
    const port = process.env.PORT || 3000 ;

    app.use(express.static('public'))
    app.use(passport.initialize())
    app.use(express.urlencoded({extended : true}))
    app.use(express.json()); 

    const schema = buildSchemaSync({
        resolvers : [
            UserResovler ,
            AuthResolver ,
            PropertyResolver ,
            ReviewResolver ,
            ReportResolver ,
        ] ,
        validate : false ,
        authChecker , 
        emitSchemaFile : path.resolve(__dirname , "schema.graphql") ,
        container : {get : (cls)=>container.resolve(cls)},
    }) ;

    const apolloServer = new ApolloServer({
        schema , 
        context: ({ req , res }) => ({req, res}),
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginInlineTrace()] , 
        introspection: true, 
        formatError : (err)=>{
            if(ErrorName[err.message]){
                const error = getErrorCode(err.message);
            
                return ({ message: error.message, statusCode : error.statusCode })
            }

            return {message : err.message} ; 
        }
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({app , cors : false});

    app.listen(port , ()=>{
        console.clear();
        console.log(process.version);
        console.log(`app runing on http://localhost:${port}${apolloServer.graphqlPath}`);
    })
})()