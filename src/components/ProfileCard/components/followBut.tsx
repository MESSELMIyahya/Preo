'use client';

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function FollowBut ({follow,name}:{name:string,follow:boolean}){
    const [ follower, setFollower ] = useState<boolean>(follow);
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter()

    const handleFollow = async ()=>{
        setIsLoading(true)
        const d = {
            followState:!follower,
            name:name
        }
        try{
            const { data } = await axios.post('/api/followuser',d);
        if(data.state == true){
             setFollower(e=>!e); 
             router.refresh();
        }
        setIsLoading(false)
        }catch(err){
            console.log(err);
            setIsLoading(false);
        }
        
    }



    return !isLoading ?  follower ? (<button onClick={()=>handleFollow()} className="--but sm:text-xl block text-neutral-800 bg-neutral-200 hover:bg-neutral-300 hover:text-neutral-900">Unfollow</button>) :  
    (<button onClick={()=>handleFollow()}  className="--but sm:text-xl block">Follow</button>) : 
    (
        <div className="w-[5.7em] py-[6px] flex justify-center ">

            <div className="--spr"></div>
        </div>
    )
}