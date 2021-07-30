import { prisma } from '../generated/prisma-client'

export const userResolvers ={
    Query:{
        getUser: async(_,{ id })=>{
            try {
                console.log( '=============<',id );
                
                const user = await prisma.user({ id })
                return user
            } catch (error) {
                console.log( error );
            }
        }
    },
    Mutation:{
        createUser: async(_,{ input }) =>{
            try {
                // check if the email is already registered
                const userExists = await prisma.user({ email: input.email })
                if( userExists ){
                    throw new Error(`The email ${ input.email } is already registered`);
                }
                // register user
                const user = await prisma.createUser( input );
                return user
            } catch (error) {
                console.log( error);
            }
        }
    }
}