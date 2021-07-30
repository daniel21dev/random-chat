import { resolvers } from './resolvers'
import { typeDefs } from './schemas/index';
import { validateJWT } from './helpers/jwt';
import {ApolloServer} from 'apollo-server'
import express from 'express'
import path from 'path'


export class Server{
    apolloServer : ApolloServer;
    app: express.Application;

    constructor(){
        this.app = express()
        this.apolloServer = new ApolloServer({
            resolvers,
            typeDefs,
            context: async({ req }) =>{
                const token = req.headers['token'] || ''
                if( token ){
                    try {
                        const user = await validateJWT( token )
                        return {
                            user
                        }
                    } catch (error) {
                        console.log( error );
                    }
                }
            }
        })

        this.middlewares()
    }

    middlewares(){
        this.app.use( express.static( path.join( __dirname, '../public') ) )
    }

    start(){
        this.apolloServer.listen().then(({url})=>{
            console.log(`Server listening on ${ url }`);
        })

        this.app.listen( process.env.PORT,()=>{
            console.log(`Frontend app in ${ process.env.PORT }`);
        })
    }
}