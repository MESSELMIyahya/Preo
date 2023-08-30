// @ts-nocheck
import { ConnectToDb } from "@/db";
import userModel from "@/db/models/User";
import NextAuth from "next-auth/next"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";


export const AuthOptions = {
    providers:[ 
        CredentialsProvider({
            name:"credentials",
            credentials:{},
            async authorize(c){
                try{
                    await ConnectToDb();

                    // check the user
                    const user = await userModel.findOne({Email:c.email});
                    if(!user) return null;

                    // check the password 
                    const passMatch = await bcrypt.compare(c.password,user.Password);
                    if(!passMatch) return null ;

                    
                    return { name:user.Name,email:user.Email,image:user.Image } ;
                }catch(err){
                    console.log(err);
                    return null 
                }
            }
        })
    ],
    events:{
        signOut:async()=>{
            redirect('/')
        }
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET as string ,
    pages:{
        signIn:"/signin",
    }
}

const handler = NextAuth(AuthOptions);

export { handler as GET , handler as POST };