import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Card404 from "@/components/404crd";
import ProfileCard from "@/components/ProfileCard";
import { getColor } from "@/libs";
import { GetUserProfileWithName } from "@/libs/user/inde";
import { getServerSession } from "next-auth/next";
import { GetUserTheme } from "@/libs/user/inde";




export const generateMetadata = async ({params}:{params:{user:string}}) => {
    const user = await getServerSession(AuthOptions as {});
    let profileData = null;
    
    if(user && params.user){
        const d = await GetUserProfileWithName({user:user.user,Name:params.user});
        profileData = d ;
    }

    return {
      title: `Preo | ${profileData?.Name || 'Preo member not found'}`,
    };
};


export default async function UserProfilePage ({params}:{params:{user:string}}){
    const user = await getServerSession(AuthOptions as {});
    let profileData = null;
    let colorTheme : [string,string] = ["#06b6d4", "#3b82f6"];
    
    if(user && params.user){
        const userTheme = await GetUserTheme(user.user);
        if(userTheme) colorTheme = getColor(Number(userTheme.theme));

        const d = await GetUserProfileWithName({user:user.user,Name:params.user});
        profileData = d ;

    }
        return (<section className="w-full mt-[6em] select-none z-10">
        <div  className="w-full flex justify-center">

        {
            profileData ? ( <ProfileCard data={profileData} theme={colorTheme} Name={user?.user?.name as string} owner={false} />) : (<Card404/>)
        }
        
    
        </div>
        </section>
        ) ;
    

}