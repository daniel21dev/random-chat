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
        createUser( input: UserInput! ): AuthUser
        loginUser( input: LoginInput! ): AuthUser

        #Message 
        createMessage( input: MessageInput! ): Message
        updateMessage( input: UpdateMessageInput! ): Message
    }
`

export const typeDefs = [
    userSchema,
    messageSchema,
    MutationDefs,
    QueryDefs
]