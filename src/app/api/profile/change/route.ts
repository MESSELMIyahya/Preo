// @ts-nocheck
import { ConnectToDb } from '@/db';
import userModel from '@/db/models/User';
import { NextRequest , NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { AuthOptions } from '../../auth/[...nextauth]/route';
import postModel from '@/db/models/Post';
import fs from 'fs';

export async function PUT(req:NextRequest) {
    try{
        const user = await getServerSession(AuthOptions);
        const UserChanges = await req.json();
        if(!user || !UserChanges) throw 'err from here';
        await ConnectToDb();
        
        // get user
        const User = await userModel.findOne({Email:user.user?.email });
        if(!User) throw 'user is not reall';


        await userModel.updateOne({Email:user.user?.email },UserChanges);

        const Posts = (await postModel.find({})).filter(e=>e.Author.Id == User._id) as PostSchemaType[]

        const newPosts = Posts.map(e=>e._id);

        for(let i=0;i<newPosts.length;i++){
            const d = newPosts[i];
            await postModel.updateOne({_id:d},{Author:{Image:User.Image,Id:User._id,Tag:UserChanges.Tag,Name:UserChanges.Name}})
        }



        fs.writeFileSync('./UserPosts.json',JSON.stringify(newPosts),'utf-8');
        console.log(newPosts);
        


        // fs.writeFileSync('./UserPosts.json',JSON.stringify(Posts),'utf-8');
        // console.log(Posts);
        


        return new Response(null,{status:200});
    }catch(e){
        console.log(e)
        return new Response(null,{status:500});
    }
}
