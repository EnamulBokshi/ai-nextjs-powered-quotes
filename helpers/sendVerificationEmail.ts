import VerificationEmail from "@/emails/VerificationEmail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiRespose";

export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse>{

    try{
        await resend.emails.send({
            from:'onboarding@resnd.dev',
            to:email,
            subject: "Verify your email",
            react: VerificationEmail({username,otp:verifyCode})
        })
        return {success:true,message:"Verification email sent"}
    }
    catch(err){
        console.log("Error sending verification email",err)
        return {
            success:false,
            message:"Error sending verification email"
        }
    }


     
}