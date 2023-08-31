
import { ConnectToDb } from "@/db";
import { getServerSession } from "next-auth/next";
import { NextResponse,NextRequest } from "next/server";
import userModel from "@/db/models/User";
import { AuthOptions } from "../../auth/[...nextauth]/route";


export async function POST(req:NextRequest) {
    try{

        const user = await getServerSession(AuthOptions as {});
        if(!user?.user) throw '';
        await ConnectToDb();

        const {theme} = await req.json();
        

        const CuUser = await userModel.findOne({Email:user?.user.email});
        if(!CuUser) return new Response(null,{status:404});
        
        await userModel.updateOne({Email:user?.user.email},{Theme:theme})
 
        return NextResponse.json({set:true});
    }catch(e){       
        return new Response(null,{status:500});
    }
}