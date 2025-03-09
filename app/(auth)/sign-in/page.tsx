'use client';
import { signIn,signOut,useSession } from "next-auth/react";
function page() {
    const {data:session} = useSession()
    if(session){
        return (
            <>
            welcome {session?.user.email}
                <div onClick={()=>signOut()}>signout</div>
            </>
        )
    }
  return (
    <div>
      <button onClick={()=>signIn()}>Sign in</button>
    </div>

  )
}

export default page