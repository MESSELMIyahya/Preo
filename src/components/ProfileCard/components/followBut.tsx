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



    return !isLoading ?  follower ? (<button onClick={()=>handleFollow()} className="--but sm:text-xl block text-blue-600 bg-blue-200 hover:bg-blue-300 hover:text-blue-600">Followed</button>) :  
    (<button onClick={()=>handleFollow()}  className="--but sm:text-xl block">Follow</button>) : 
    (
        <div className="w-[5.7em] py-[6px] flex justify-center ">

            <div className="w-5 h-5 m-[2px] rounded-full border-[3px] border-solid border-blue-500 border-r-transparent animate-spin"></div>
        </div>
    )
}