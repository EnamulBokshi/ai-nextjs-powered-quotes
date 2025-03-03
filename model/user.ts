import mongoose,{Schema,Document} from "mongoose";


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    verifyCode:string;
    verifyCodeExpire: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[]

}

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})
const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "User name is required"],
        trim: true,
        unique: true
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        
    },
    verifyCode:{
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpire: {
        type: Date,
        required: [true, "Verify code expire date is required"],
        
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel;
