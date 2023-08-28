import { ConnectToDb } from '@/db';
import userModel from '@/db/models/User';
import { NextRequest , NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '../../auth/[...nextauth]/route';
import postModel from '@/db/models/Post';

export async function POST(req:NextRequest) {
    try{
        const user = await getServerSession(AuthOptions);
        if(!user) throw '';
        const Data = await req.json();
        await ConnectToDb();

        // get user
        const User = await userModel.findOne({Email:Data.Email});
        if(!User) throw 'user is not reall';

        const PostData : PostSchemaType = {
            Author:{
                Name:User.Name,
                Id:User._id,
                Image:User.Image,
                Tag : User.Tag ,
            },
            Date:new Date()+'',
            Likes:[],
            Text:Data.Text
        };

        const Post = new postModel(PostData);
        await Post.save();
        return new Response(null,{status:201});
    }catch(e){
        console.log(e)
        return new Response(null,{status:500});
    }
}
