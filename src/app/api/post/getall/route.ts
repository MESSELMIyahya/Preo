import { ConnectToDb } from "@/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import userModel from "@/db/models/User";
import postModel from "@/db/models/Post";


export async function GET() {
    try{
        const user = await getServerSession(AuthOptions);
        if(!user) throw '';
        await ConnectToDb();
        const CuUser =  await userModel.findOne({Email:user.user?.email});
        if(!CuUser) throw 'user null';
        const Posts = await postModel.find({}) as Array<PostSchemaType> ;
        return NextResponse.json(Posts.reverse());
    }catch(e){
        console.log(e);
        
        return new Response(null,{status:500});
    }
}