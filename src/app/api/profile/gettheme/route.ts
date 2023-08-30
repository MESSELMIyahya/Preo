
import { ConnectToDb } from "@/db";
import { getServerSession } from "next-auth/next";
import { NextResponse,NextRequest } from "next/server";
import userModel from "@/db/models/User";


export async function POST(req:NextRequest) {
    try{

        const user = await req.json();
        
        await ConnectToDb();
        const CuUser = await userModel.findOne({Email:user.email});
        if(!CuUser) return new Response(null,{status:404});
        
        const Data = { theme : CuUser.Theme ? CuUser.Theme : "0" }
 
        return NextResponse.json(Data);
    }catch(e){       
        return new Response(null,{status:500});
    }
}