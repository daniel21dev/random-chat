import { gql } from 'apollo-server';
import { userSchema } from './user';
import { messageSchema } from './message';

// here are declared al queries
const QueryDefs = gql`
    type Query{
        #User
        getUser: User
        #Message
        getRandomMessage: Message
        getUserMessages: [Message]
    }
`
// here are declared al mutations
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
// here are exported all schemas
export const typeDefs = [
    userSchema,
    messageSchema,
    MutationDefs,
    QueryDefs
]