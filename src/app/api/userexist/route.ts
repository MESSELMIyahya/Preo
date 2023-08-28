import { ConnectToDb } from "@/db";
import userModel from "@/db/models/User";
import { NextRequest,NextResponse } from "next/server";
import url from "url";


export async function GET(req:NextRequest) {
    try{
        const { email } = url.parse(req.url,true).query
        await ConnectToDb();
        const user = await userModel.findOne({Email:email})
        const exists : boolean = user && true ;
        console.log(exists);
        return NextResponse.json({is:exists})
    }catch(e){
        return new Response(null,{status:500});
    }
}