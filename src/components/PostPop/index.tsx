'use client';

import { usePostMod } from "@/contexts/maindata";
import { useRouter } from "next/navigation";
import ConfirmPopup from "../ConfirmPopup";
import { useContext, useState } from "react";
import axios from "axios";
import { HomeCtx } from "../Home";



interface Props {
    isOwner:boolean,
    PostId:string,
    close:()=>void,
    text:string
}

export default function PostPopup ({close,isOwner,PostId,text}:Props){
    const {setPostType,setData} = usePostMod();
    const [toggleCon, setToggleCon] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const { handlePostsShow } = useContext(HomeCtx);
    const route = useRouter();

    const HandleUpdatePost = () =>{
        if(!isOwner||!text) return ;
        setData<{text:string}>({text});
        setPostType('update',PostId);
        route.push('/postit');
    }

    const handleConfirmDeletePost = async (n:boolean)=> { 
        
        if(n){
            setIsLoading(true)
            try{
                await axios.delete('/api/post/delete',{data:{id:PostId}});
                setIsLoading(false);
                handlePostsShow(PostId);
                close();
            }catch(err){
                console.log(err);
                close();
            }
        }else{
            setToggleCon(false)
            close();
        }
    }

    const DeletePost = ()=>{
        setToggleCon(true);
    }


    return(
        <>
        <div onClick={()=>close()} className="fixed top-0 left-0 w-full h-[100vh]  z-[30]"></div>

        <div className="--crd shadow-lg --border2 absolute top-[3.5rem] left-[88%] sm:left-[48%] md:left-[60%]  p-1 w-[11em] rounded-lg z-[31]">

            <ul className="flex flex-col w-full ">
                {/* save */}
                <li className="w-full p-2 rounded-md cursor-pointer flex items-center gap-2 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-sm fill-neutral-700">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"/></svg>
                    </i>
                    <p className="text-neutral-800 text-sm font-medium">Save  <span className="text-neutral-400 text-xs">(coming soon)</span> </p>
                </li>

                {/* edit */}
                {
                    isOwner ? (
                    <li onClick={()=>HandleUpdatePost()} className="w-full p-2 rounded-md cursor-pointer flex items-center gap-2 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-sm fill-neutral-700">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                    </i>
                    <p className="text-neutral-800 text-sm font-medium">Edit Post</p>
                </li>
                    ) : (<></>)
                }
                
                 {/* hide */}
                 <li className="w-full p-2 rounded-md cursor-pointer flex items-center gap-2 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-sm fill-neutral-700">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                    </i>
                    <p className="text-neutral-800 text-sm font-medium">Hide it <span className="text-neutral-400 text-xs">(coming soon)</span> </p>
                </li>

                 {/* delete */}
                 {
                    isOwner ? (
                 <li onClick={DeletePost} className="w-full p-2 rounded-md cursor-pointer flex items-center gap-2 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-sm fill-neutral-700">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                    </i>
                    <p className="text-neutral-800 text-sm font-medium">Delete it</p>
                </li>
                    ): (<></>)
                    }


            </ul>
            
        </div>
                
    {
        toggleCon ? (<ConfirmPopup isLoading={isLoading} dsq="if delete this post you won't be able to get it back" title="Are you sure" handleClick={handleConfirmDeletePost} />) : ''
    }

</>);
}