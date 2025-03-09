import 'next-auth'
import { DefaultSession } from 'next-auth'
import { DefaultDeserializer } from 'v8'

declare module 'next-auth'{
    interface User{
        _id?:string,
        isVerified?:boolean,
        isAcceptingMessages?:boolean,
        username?:string

    };
    interface Session{
        user:{
            _id:string,
            isVerified:boolean,
            isAcceptingMessages:boolean,
            username:string
        }&DefaultSession['user']
    };
    interface JWT{
        _id:string,
        isVerified:boolean,
        isAcceptingMessages:boolean,
        username:string
    }
}
// declare module 'next-auth/jwt'{
//     interface JWT{
//         _id:string,
//         isVerified:boolean,
//         isAcceptingMessages:boolean,
//         username:string
//     }
// }