import SignInCrd from "@/components/Signin";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";



export default async function SignInPage  (){

    const user = await getServerSession(AuthOptions);
    if(user){ redirect('/')}
    else{
          return(<section className="w-full mt-[6em] select-none">

    <div  className="w-full flex justify-center">

        <SignInCrd/>

    </div>

    </section>);
    }
}