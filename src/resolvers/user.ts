import { prisma } from '../generated/prisma-client'
import bcrypt from 'bcryptjs'
import { createJWT } from '../helpers/jwt';

export const userResolvers ={
    Query:{
        getUser: async(_,__, ctx )=>{
            // return the user loggedin
            return ctx.user
        }
    },
    Mutation:{
        createUser: async(_,{ input }) =>{
            const { password, email } = input 
            input.email = email.toLowerCase()
            // check if the email is already registered
            const userExists = await prisma.user({ email: input.email })
            if( userExists ){
                throw new Error(`The email ${ input.email } is already registered`);
            }
            // Hash password
            const salt = await bcrypt.genSalt(10);
            input.password = await bcrypt.hash( password,salt );
            // register user
            const user = await prisma.createUser( input );
            // genrate token 
            const token = await createJWT( user.id )
            return {
                user,
                token
            }
        },
        loginUser: async(_,{ input })=>{
            const { password, email } = input 
            input.email = email.toLowerCase()
            // check if user exists
            const user = await prisma.user({ email: input.email })
            if( !user ){    
                throw new Error(`User does not exists!`);
            }
            // compare the input password with the DB password
            if( !bcrypt.compareSync( password, user.password ) ){
                throw new Error(`Password incorrect`);
            }
            // create token
            const token = await createJWT( user.id )
            return {
                user,
                token
            } 
        }
    }
}