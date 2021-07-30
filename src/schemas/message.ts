import { gql } from 'apollo-server'

export const messageSchema = gql`
    type Message{
        id: ID
        text: String
        createdAt: String
    }

    input MessageInput{
        text: String!
    }

    input UpdateMessageInput{
        id: ID!
        text: String!
    }
`;