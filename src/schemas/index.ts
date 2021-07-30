import { gql } from 'apollo-server';
import { userSchema } from './user';
import { messageSchema } from './message';

const QueryDefs = gql`
    type Query{
        #User
        getUser( id: ID ): User
        #Message
        getRandomMessage: Message
        getUserMessages: [Message]
    }
`
const MutationDefs = gql`
    type Mutation{
        #User
        createUser( input: UserInput! ): User
        loginUser( input: LoginInput! ): String

        #Message 
        createMessage( input: MessageInput! ): Message
    }
`

export const typeDefs = [
    userSchema,
    messageSchema,
    MutationDefs,
    QueryDefs
]