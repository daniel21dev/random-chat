import { prisma } from '../generated/prisma-client'
import { getRandomInt } from '../helpers/getRandomInt';

export const messageResolvers ={
    Query:{
        getRandomMessage: async()=>{
            try {
                // get number of registers
                const numberOfMessages = await prisma.messagesConnection()
                    .aggregate()
                    .count()
                // slect a random message
                const message = await prisma.messages({
                    first: 1,
                    skip: getRandomInt(0, numberOfMessages)
                })
                return message[0]
            } catch (error) {
                console.log( error );
            }
        },
        getUserMessages: async(_,__, ctx ) =>{
            // check if user is auhtenticated
            if( !ctx.user ){
                throw new Error('You must be authenticated')
            }
            // find and order the user messages
            const messages = await prisma.user({ id: ctx.user.id })
                                            .messages({
                                                orderBy: 'createdAt_DESC'
                                            })
            return messages
        }
    },
    Mutation:{
        createMessage: async(_,{ input }, ctx) =>{
            const {text} = input
            // check if user is auhtenticated
            if( !ctx.user ){
                throw new Error('You must be authenticated')
            }

            try {
                // register message
                const message = await prisma.createMessage({
                    text,
                    user:{
                        connect: { id: ctx.user.id }
                    }
                })
                return message
            } catch (error) {
                console.log( error);
            }
        },
        updateMessage: async(_,{ input }, ctx) =>{
            const {text, id} = input
            // check if user is auhtenticated
            if( !ctx.user ){
                throw new Error('You must be authenticated')
            }

            try {
                // register message updateMessage
                const message = await prisma.updateMessage({
                    data:{ text },
                    where:{ id }
                })
                return message
            } catch (error) {
                console.log( error);
            }
        }
    }
}