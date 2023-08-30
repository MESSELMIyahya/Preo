import CreatePost from "@/components/CreatePost";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function PostItPage (){

    const user = await getServerSession(AuthOptions);
    if(!user){ redirect('/')}

    return(<div className="z-10">
    <CreatePost/>
    </div>)
}