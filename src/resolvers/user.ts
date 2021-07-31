import { prisma } from '../generated/prisma-client'
import bcrypt from 'bcryptjs'
import { createJWT } from '../helpers/jwt';

export const userResolvers ={
    Query:{
        getUser: async(_,{ id })=>{
            const user = await prisma.user({ id })

            if( !user ){
                throw new Error('The user does not exists')
            }

            return user
        }
    },
    Mutation:{
        createUser: async(_,{ input }) =>{
            const { password, email } = input 
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
        },
        loginUser: async(_,{ input })=>{
            const { password, email } = input 
            const user = await prisma.user({ email })
            if( !user ){    
                throw new Error(`User does not exists!`);
            }

            if( !bcrypt.compareSync( password, user.password ) ){
                throw new Error(`Password incorrect`);
            }

            const token = await createJWT( user.id )
            return token 
        }
    }
}