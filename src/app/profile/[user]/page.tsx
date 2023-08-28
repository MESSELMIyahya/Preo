import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Card404 from "@/components/404crd";
import ProfileCard from "@/components/ProfileCard";
import { GetUserProfileWithName } from "@/libs/user/inde";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";




export const generateMetadata = async ({params}:{params:{user:string}}): Metadata  => {
    const user = await getServerSession(AuthOptions);
    let profileData = null;
    
    if(user && params.user){
        console.log(user,params.user);
        const d = await GetUserProfileWithName({user:user.user,Name:params.user});
        profileData = d ;
    }

    return {
      title: `Preo | ${profileData?.Name || 'Preo member not found'}`,
    };
};


export default async function UserProfilePage ({params}:{params:{user:string}}){
    const user = await getServerSession(AuthOptions);
    let profileData = null;
    
    if(user && params.user){
        const d = await GetUserProfileWithName({user:user.user,Name:params.user});
        profileData = d ;
    }
        return (<section className="w-full mt-[6em] select-none">
        <div  className="w-full flex justify-center">

        {
            profileData ? ( <ProfileCard data={profileData} Name={user?.user?.name as string} owner={false} />) : (<Card404/>)
        }
           
    
        </div>
        </section>
        ) ;
    

}