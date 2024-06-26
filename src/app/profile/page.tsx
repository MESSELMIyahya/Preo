import ProfileCard from "@/components/ProfileCard";
import { GetUserProfile } from "@/libs/user/inde";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getColor } from "@/libs";


export const metadata: Metadata = {
    title: 'Preo | My profile',
    description: '',
}
  

export default async function ProfilePage (){
    const user = await getServerSession(AuthOptions as {});
    let profileData = null;
    let colorTheme : [string,string] = ["#06b6d4", "#3b82f6"];
    if(!user?.user){ redirect('/')}

    if(user){
        const d = await GetUserProfile(user?.user);
        if(d) profileData = d 
        if(profileData) colorTheme = getColor(Number(profileData.Theme));
    }


    return (<section className="w-full mt-[6em] select-none z-10">
    <div  className="w-full flex justify-center">

        <ProfileCard Name={user?.user.name||'Your Name'} data={profileData} theme={colorTheme} owner />

    </div>
    </section>
    ) ;
}