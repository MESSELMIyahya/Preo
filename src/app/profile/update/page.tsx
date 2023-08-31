import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileUpdateCard from "@/components/ProfileUpdateCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";



export default async function ProfileUpdatePage (){
        
    const user = await getServerSession(AuthOptions as {});
    if(!user){ redirect('/')}

    return (<section className="w-full mt-[6em] select-none z-10">
    <div  className="w-full flex justify-center">

            <ProfileUpdateCard/>

    </div>
    </section>
    ) ;
}