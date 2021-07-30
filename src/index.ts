import {ApolloServer} from 'apollo-server'
import { userResolvers } from './resolvers/user';
import { userSchema } from './schemas/user';

const server = new ApolloServer({
    resolvers: {...userResolvers},
    typeDefs: [userSchema]
})

server.listen().then(({url})=>{
    console.log(`Server listening on ${ url }`);
})