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
`;

