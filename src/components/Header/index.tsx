'use client'; 

import Link from "next/link";
import { useState } from "react";

export default function Header() {

    const [session,setSession] = useState(true);
    const [toggleMin ,setToggleMin] = useState(false);


    return (<div className="w-full fixed flex  justify-between items-center top-0 left-0 py-3 p-8  backdrop-blur-md">
        <Link href={'/'} className="text-3xl select-none text-white font-bold ">P<span className="text-blue-600">R</span>E<span className="text-blue-600">O</span></Link>

        {
            session ? (

        <nav className="flex gap-3 items-center">
            <div className="flex gap-3 items-center sm:hidden">
                <button className="--but-out">Sign out</button>
                <button className="--but">Add post</button>
            </div>
            {
                toggleMin ?(

            <div className="w-[9.4em] hidden gap-3 items-center absolute sm:flex flex-wrap top-[110%] right-1 --border shadow-lg bg-neutral-100 rounded-md p-4">
                <Link href={'/'} className="flex text-xl font-medium text-blue-400">Your Profile</Link>
                <button className="--but-out">Sign out</button>
                <button className="--but">Add post</button>
            </div>
                ) 
                
                : (<></>)
            }
            <div onClick={()=>setToggleMin(e=>!e)} className="w-10 h-10 hidden sm:block rounded-full cursor-pointer bg-blue-500"></div>
            <div className="w-10 h-10 sm:hidden rounded-full cursor-pointer bg-blue-500"></div>
        </nav>

            ) : (

                <nav className="flex gap-3 items-center">
                    <button className="--but-out">Register</button>
                    <button className="--but">Sign in</button>
                </nav>
            )
        }



    </div>);
}