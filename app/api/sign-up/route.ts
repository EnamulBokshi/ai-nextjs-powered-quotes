import dbConnect from "@/lib/dbConnection";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, username, password } = await request.json();
    const exUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (exUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        }
      );
    }
    const exUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (exUserByEmail) {
      // TODO: Send verification email again
        if (exUserByEmail.isVerified){
            return Response.json(
                {
                    success:false,
                    message:"Email already in use"
                },{status:400})
        }
        else{
            const hashedPassword = await bcrypt.hash(password,12);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+1);

            exUserByEmail.username = username;
            exUserByEmail.password = hashedPassword;
            exUserByEmail.verifyCode = verifyCode;
            exUserByEmail.verifyCodeExpire = expiryDate;
            await exUserByEmail.save();
        }
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        email,
        username,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json({success:false,message:"Error sending verification email"},{status:500});
    }

    return Response.json(
      {
        success: true,
        message: "User signed up successfully",
      },
      {
        status: 201,
      }
    );

  } catch (err) {
    console.error("Error signing up user", err);
    return Response.json(
      {
        success: false,
        message: "Error signing up user",
      },
      {
        status: 500,
      }
    );
  }
}
