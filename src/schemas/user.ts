import { gql } from 'apollo-server'

export const userSchema = gql`
    type User{
        id: ID
        name: String
        email: String
    }

    input UserInput{
        name: String!
        email: String!
        password: String!
    }

    type Query{
        getUser( id: ID ): User
    }

    type Mutation{
        createUser( input: UserInput ): User
    }
`;

