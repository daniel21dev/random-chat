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
            const { password, email, name } = input 
            // check if is a valid email
            if( !( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( email )) ){
                throw new Error(`The email ${ input.email } is Invalid`);
            }
            input.email = email.toLowerCase()
            input.name = name.trim()
            // check name length
            if( input.name.length < 6 || input.name.length > 255){
                throw new Error(`The name must be 6-255 characteres`);
            }
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