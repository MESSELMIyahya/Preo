import { ConnectToDb } from "@/db";
import userModel from "@/db/models/User";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { v4 } from 'uuid'

export async function POST(req:NextRequest) {
    try{
        
        const user = await getServerSession(AuthOptions);
        const data = await req.json();
        
        
        if(!user || !data) throw 'no auth';

        await ConnectToDb();
        // current user
        const Follower = await userModel.findOne({Email:user.user?.email});
        if(!Follower) throw new Response(null,{status:404});

        // followed user 
        const FollowedUser = await userModel.findOne({Name:data.name});
        if(!FollowedUser) throw new Response(null,{status:404});


        const newState = data.followState ;
        console.log(newState);
        
        if(newState){
            if(!Follower.Follow.includes(FollowedUser.Name) && !FollowedUser.Followers.includes(Follower.Name)){
            await userModel.updateOne({Name:Follower.Name},{Follow:[...Follower.Follow,FollowedUser.Name]});
            await userModel.updateOne({Name:FollowedUser.Name},{Followers:[...FollowedUser.Followers,Follower.Name]})
            }
            
        }else {
            if(Follower.Follow.includes(FollowedUser.Name) && FollowedUser.Followers.includes(Follower.Name)){
            const g = Follower.Follow.filter((e: string)=>e != FollowedUser.Name);
            await userModel.updateOne({Name:Follower.Name},{Follow:g});

            const f = FollowedUser.Followers.filter((e: string)=>e != Follower.Name);
            await userModel.updateOne({Name:FollowedUser.Name},{Followers:f});
            }
        }
        
        return NextResponse.json({state:true,modId:v4()})
    }catch(e){
        return new Response(null,{status:500});
    }
}