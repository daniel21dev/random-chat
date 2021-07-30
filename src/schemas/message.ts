import { gql } from 'apollo-server'

export const messageSchema = gql`
    type Message{
        id: ID
        text: String
        createdAt: String
    }

    input MessageInput{
        user: ID!
        text: String!
    }
`;