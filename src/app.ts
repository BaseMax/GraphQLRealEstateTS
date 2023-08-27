import "reflect-metadata";
import './jwt/jwt.startegy';

import express from 'express';
import passport from "passport";
import { buildSchemaSync } from "type-graphql";
import { getErrorCode } from "./errors/http-error";
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";

import { authChecker } from "./middlewares/auth.middleware";

import { AuthResolver } from "./resolvers/auth.resolver";
import { UserResovler } from "./resolvers/user.resolver";
import { PropertyResolver } from "./resolvers/property.resolver";

(async ()=>{
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
        validate : true ,
        authChecker ,
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
            
            if(err.extensions.code === "INTERNAL_SERVER_ERROR"){
                return ({ message: err.message , statusCode : 500})
            }
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