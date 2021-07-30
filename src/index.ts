import {ApolloServer} from 'apollo-server'
import { resolvers } from './resolvers'
import { typeDefs } from './schemas/index';
import dotenv from 'dotenv'
import { validateJWT } from './helpers/jwt';

dotenv.config()

const server = new ApolloServer({
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

server.listen().then(({url})=>{
    console.log(`Server listening on ${ url }`);
})