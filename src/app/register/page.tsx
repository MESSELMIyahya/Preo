// @ts-nocheck

import RegisterCrd from "@/components/register";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";




export default async function RegisterPage (){
    const user = await getServerSession(AuthOptions);
    console.log(user);
    if(user){ redirect('/')}

    return(<section className="w-full mt-[6em] select-none">

    <div  className="w-full flex justify-center">

        <RegisterCrd/>

    </div>

    </section>);
}