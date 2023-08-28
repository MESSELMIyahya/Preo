import { ConnectToDb } from "@/db";
import { getServerSession } from "next-auth/next";
import { NextResponse,NextRequest } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import userModel from "@/db/models/User";
import postModel from "@/db/models/Post";


export async function POST(req:NextRequest) {
    try{
        const {user} = await req.json();
        console.log(user);
        
        if(!user) throw 'non user';        
        await ConnectToDb();
        const CuUser =  await userModel.findOne({Email:user?.email});
        if(!CuUser) throw 'user null';
        const Posts = await postModel.find({}) as Array<PostSchemaType> ;
        return NextResponse.json(Posts.reverse());
    }catch(e){
        console.log(e);
        
        return new Response(null,{status:500});
    }
}