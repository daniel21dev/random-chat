import {ApolloServer} from 'apollo-server'
import { resolvers } from './resolvers'
import { typeDefs } from './schemas/index';
import dotenv from 'dotenv'

dotenv.config()

const server = new ApolloServer({
    resolvers,
    typeDefs
})

server.listen().then(({url})=>{
    console.log(`Server listening on ${ url }`);
})