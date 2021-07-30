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
        }
    },
    Mutation:{
        createMessage: async(_,{ input }) =>{
            const {user, text} = input
            try {
                // register message [ falta autenticacion ]
                const message = await prisma.createMessage({
                    text,
                    user:{
                        connect: { id: user }
                    }
                })
                return message
            } catch (error) {
                console.log( error);
            }
        }
    }
}