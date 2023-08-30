'use clinet';

import Link from "next/link";
import PostPopup from "../PostPop";
import { useState } from "react";


interface Props {
    Text: string;
    date: string;
    Author: {
        Name: string;
        Tag: string;
        Image: string;
    }
    FullSize?:boolean
    id:string
    color:string
    owner:boolean,
}


export default function Post({ FullSize, Author,date,Text,owner,id,color }: Props) {

    const [ toggleMenu , setToggleMenu ] = useState<boolean>(false);
 

    return (<>
        <div style={{width:FullSize ? '100%':''}} className="w-[26em] sm:w-full --crd p-4 relative">
            {

              toggleMenu ? (<PostPopup isOwner={owner} text={Text} PostId={id} close={()=>setToggleMenu(false)} />) : (<></>)

            }

            <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                    <div style={{backgroundColor:color||''}} className="w-10 h-10 bg-neutral-800 rounded-full flex justify-center items-center">
                    <div className=" items-center text-xl text-blue-50  font-bold uppercase" >{
                    
                    Author.Name.split('')[0] 
                    }</div>
                    </div>
                    <div className="">
                        <Link href={`/profile/${Author.Name}`} className="text-xl block leading-5 text-neutral-900 font-medium ">
                           {Author.Name}
                        </Link>
                        <span className="text-sm text-neutral-400 font-medium ">
                        {Author.Tag}
                        </span>
                    </div>

                </div>



                <div className="w-8 h-8 flex justify-center items-center">

                <i onClick={()=>setToggleMenu(true)} className="text-2xl fill-neutral-400 transition-colors hover:fill-neutral-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
                </i>
                    </div>

            </div>

            <div className="w-full  ">
                <p className="text-[1.1em]  flex text-neutral-900">
                  {Text}
                </p>
            </div>

            <div className="w-full flex justify-between">

            </div>


        </div>
    </>)
}