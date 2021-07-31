import jwt from 'jsonwebtoken'
import { prisma } from '../generated/prisma-client'

export const createJWT = ( id ) =>{
    return new Promise( (resolve, reject) =>{

        const payload = { id };

        jwt.sign( payload , process.env.SECRETWORD, {
            expiresIn: '12h'
        }, ( err, token)=>{
            if( err ){
                console.log( err);
                reject('it could not generate jwt')
            }else{
                resolve( token );
            }
        });

    });
}

export const validateJWT = async ( token: string | string[] ) =>{
    try {
        const { id } = jwt.verify( token, process.env.SECRETWORD );
        if( !id ){
            // trow error
            throw new Error(`Invalid token`);
        }
        const userAuth = prisma.user({ id })

        if( !userAuth ){
            // trow error
            throw new Error(`The user does'nt exists`);
        }

        return userAuth;
    } catch (error) {
        console.log( error );
    }

}
