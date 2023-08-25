import "reflect-metadata"
import express from 'express';
import { ApolloServer } from 'apollo-server-express'

const app = express();
const port = process.env.PORT || 3001;

const server = new ApolloServer({
    
})


server.applyMiddleware({app})


app.listen(port , ()=>{
    console.clear()
    console.log(process.version)
    console.log(`app runing on port ` , port)
})
