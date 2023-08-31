import { ConnectToDb } from '@/db';
import userModel from '@/db/models/User';
import { NextRequest , NextResponse } from 'next/server';
import bcrypt from 'bcrypt' ;

export async function POST(req:NextRequest) {
    try{
        const e = await req.json();
        await ConnectToDb();
        const user_password = await bcrypt.hash(e.Password,10) ;
        const user_data : UserSchemaType = { Theme:'0',Tag:"@PreoMumber",Email:e.Email,Name:e.Name,Password:user_password,Desq:" ",Image:" ",Posts:[] } ;
        const user = new userModel(user_data)
        await user.save()
        return new Response(null,{status:201});
    }catch(e){
        console.log(e)
        return new Response(null,{status:500});
    }
}