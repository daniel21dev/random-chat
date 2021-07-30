import { prisma } from '../generated/prisma-client'
import bcrypt from 'bcryptjs'
import { createJWT } from '../helpers/jwt';

export const userResolvers ={
    Query:{
        getUser: async(_,{ id })=>{
            try {
                const user = await prisma.user({ id })
                return user
            } catch (error) {
                console.log( error );
            }
        }
    },
    Mutation:{
        createUser: async(_,{ input }) =>{
            const { password, email } = input 
            try {
                // check if the email is already registered
                const userExists = await prisma.user({ email })
                if( userExists ){
                    throw new Error(`The email ${ input.email } is already registered`);
                }
                // Hash password
                const salt = await bcrypt.genSalt(10);
                input.password = await bcrypt.hash( password,salt );
                // register user
                const user = await prisma.createUser( input );
                return user
            } catch (error) {
                console.log( error);
            }
        },
        loginUser: async(_,{ input })=>{
            const { password, email } = input 
            try {
                const user = await prisma.user({ email })
                if( !user ){    
                    throw new Error(`User does not exists!`);
                }

                if( !bcrypt.compareSync( password, user.password ) ){
                    throw new Error(`Password incorrect`);
                }

                const token = await createJWT( user.id )
                return token 
            } catch (error) {
                console.log( error );
            }
        }
    }
}