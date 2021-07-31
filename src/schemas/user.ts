import { gql } from 'apollo-server'

export const userSchema = gql`
    type User{
        id: ID
        name: String
        email: String
    }

    type AuthUser{
        user: User
        token: String
    }

    input UserInput{
        name: String!
        email: String!
        password: String!
    }

    input LoginInput{
        email: String!
        password:String!
    }
`;

