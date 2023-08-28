'use client';
import { useNewFetch } from "@/contexts/maindata";
import Post from "../Post";
import { useEffect, useState } from "react";
import axios from "axios";


interface Props {
    posts:PostSchemaType[]
}


export default function HomePosts({posts}:Props){
    const [Posts,setPosts] = useState<PostSchemaType[]>(posts);
    const { isNew,stopNew } = useNewFetch();
    useEffect(()=>{
        if(isNew){
            (async()=>{
                const {data} = await axios.get('/api/post/getall');
                if(data && data !== Posts){
                    setPosts(data);
                }
                stopNew();
            })()
        }
    },[isNew]);
   

    return(<section className="w-full mt-[8em] select-none">
    
    <div className="w-full my-10 flex justify-center flex-col gap-8 items-center">

        {
            Posts.length != 0  ? Posts.map(e=><Post key={e.Text} Author={e.Author} date={e.Date} Text={e.Text} />) : (<>
            
            <div className="w-12 h-12 border-[6px] border-opacity-70 animate-spin  rounded-full border-white border-solid  border-l-transparent"></div>

            
            </>)
        }
        {/* {
            Posts.length == 0 ? (

                <div className="w-12 h-12 border-[6px] border-opacity-70 animate-spin  rounded-full border-white border-solid  border-l-transparent"></div>
            ) : ("")
        } */}


    </div>
    
    </section>);



}