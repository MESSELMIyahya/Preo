import ProfileCard from "@/components/ProfileCard";
import { GetUserProfile } from "@/libs/user/inde";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Preo | My profile',
    description: '',
}
  

export default async function ProfilePage (){
    const user = await getServerSession(AuthOptions as never);
    let profileData = null;
    if(!user){ redirect('/')}
    if(user){
        const d = await GetUserProfile(user.user);
        if(d) profileData = d 
    }
    return (<section className="w-full mt-[6em] select-none">
    <div  className="w-full flex justify-center">

        <ProfileCard data={profileData} owner />

    </div>
    </section>
    ) ;
}