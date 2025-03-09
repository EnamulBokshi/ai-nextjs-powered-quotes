import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnection";
import UserModel from "@/model/user";


export const authOptions: NextAuthOptions ={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();

                try {
                    const user  = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify you email first")
                    }
                    const isPassCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(!isPassCorrect){
                        throw new Error("Incorrect password")
                    }
                    return user;
                } catch (error) {
                    throw new Error("An error occurred while signing up")
                }
            }

        })
    ],
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt",
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString();
                token.username = user.username; 
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;

            }
           return token; 
        },

        async session({session,token}){
            if(token){
                session.user._id = token._id as string;
                session.user.username = token.username as string;
                session.user.isVerified = token.isVerified as boolean;
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
            }
            return session;
        }
    },

    secret:process.env.NEXTAUTH_SECRET
}
