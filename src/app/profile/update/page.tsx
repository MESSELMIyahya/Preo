
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileCard from "@/components/ProfileCard";
import ProfileUpdateCard from "@/components/ProfileUpdateCard";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";



export default async function ProfileUpdatePage (){
        
    const user = await getServerSession(AuthOptions as never);
    if(!user){ redirect('/')}

    return (<section className="w-full mt-[6em] select-none">
    <div  className="w-full flex justify-center">

        <ProfileUpdateCard/>

    </div>
    </section>
    ) ;
}