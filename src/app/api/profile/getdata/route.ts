


import { ConnectToDb } from "@/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import userModel from "@/db/models/User";



export async function GET() {
    try{
        const user = await getServerSession(AuthOptions);
        if(!user) throw '';
        await ConnectToDb();
        const CuUser =  await userModel.findOne({Email:user.user?.email});
        if(!CuUser) return new Response(null,{status:404});
        const Data = {Theme:CuUser.Theme,Desq:CuUser.Desq,Image:CuUser.Image,Tag:CuUser.Tag,Name:CuUser.Name } as UserSchemaType ;
        return NextResponse.json(Data);
    }catch(e){
        console.log(e);
        
        return new Response(null,{status:500});
    }
}