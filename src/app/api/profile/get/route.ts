import { ConnectToDb } from "@/db";
import { getServerSession } from "next-auth/next";
import { NextResponse,NextRequest } from "next/server";
import userModel from "@/db/models/User";
import postModel from "@/db/models/Post";



export async function POST(req:NextRequest) {
    try{

        const user = await req.json();
        
        await ConnectToDb();
        const CuUser = await userModel.findOne({Email:user.email});
        if(!CuUser) return new Response(null,{status:404});
        const Posts = (await postModel.find({})).filter(e=>e.Author.Id == CuUser._id);
        
        const Data = {Theme:CuUser.Theme,Follow:CuUser.Follow,Followers:CuUser.Followers,Desq:CuUser.Desq,Image:CuUser.Image,Tag:CuUser.Tag,Name:CuUser.Name,Posts:Posts||[] } as UserSchemaType ;
        return NextResponse.json(Data);
    }catch(e){       
        return new Response(null,{status:500});
    }
}