import { ConnectToDb } from '@/db';
import userModel from '@/db/models/User';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '../../auth/[...nextauth]/route';
import postModel from '@/db/models/Post';

export async function PUT(req:NextRequest) {
    try{
        const user = await getServerSession(AuthOptions as {});
        if(!user) throw 'no user';

        const Data = await req.json();
        await ConnectToDb();

        // get user
        const User = await userModel.findOne({Email:user.user?.email});
        if(!User) throw 'no user';

        // get post 

        const CuPost = await postModel.findOne({ _id:Data.id })
        if(!CuPost) throw 'post dose ont exist'

        await postModel.updateOne({_id:Data.id},{Text:Data.Text});
        
        return new Response(null,{status:200});
    }catch(e){
        console.log(e)
        return new Response(null,{status:500});
    }
}
