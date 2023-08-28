import "reflect-metadata";
import './auth/jwt/jwt.startegy';

import express from 'express';
import passport from "passport";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";

import { authChecker } from "./auth/auth.middleware";

import { AuthResolver } from "./auth/auth.resolver";
import { UserResovler } from "./user/user.resolver";
import { PropertyResolver } from "./property/property.resolver";
import path from 'path';
import { container } from "tsyringe";
import { PrismaClient } from "@prisma/client";
import { getErrorCode } from "./utils/errors/http-error";

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
            const error = getErrorCode(err.message);
            return ({ message: error.message, statusCode : error.statusCode })
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