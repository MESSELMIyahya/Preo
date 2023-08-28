'use client'; 

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {

    const {data:session,status} = useSession()
    const [toggleMin ,setToggleMin] = useState(false);


    return (<div className="w-full fixed flex  justify-between items-center top-0 left-0 py-3 p-8 z-40 backdrop-blur-md">
        <Link href={'/'} className="text-3xl select-none text-white font-bold ">P<span className="text-blue-600">R</span>E<span className="text-blue-600">O</span></Link>

        {
            status == 'loading' ? (<div className="flex gap-3 items-center">

            <div className="flex gap-3 items-center sm:hidden">
            <button className="--but-out bg-neutral-50 bg-opacity-30  w-[6.7em] py-4 animate-pulse"></button>
                <button className="--but-out bg-neutral-50 bg-opacity-30  w-[6.7em] py-4 animate-pulse"></button>
            </div>

            <div className="w-10 h-10  rounded-full cursor-pointer bg-neutral-50 bg-opacity-30 animate-pulse"></div>
            </div>) : 
            session ? (

        <nav className="flex gap-3 items-center">
            <div className="flex gap-3 items-center sm:hidden">
                <button onClick={()=>signOut()} className="--but-out">Sign out</button>
                <Link href={'/postit'} className="--but">Add post</Link>
            </div>
            {
                toggleMin ?(

            <div className="w-[9.4em] hidden gap-3 items-center absolute sm:flex flex-wrap top-[110%] right-1 --border --crd rounded-md p-4">
                <Link href={'/profile'} className="flex text-xl font-medium text-blue-400">Your Profile</Link>
                <button onClick={()=>signOut()} className="--but-out">Sign out</button>
                <Link href={'/postit'} className="--but">Add post</Link>
            </div>
                ) 
                
                : (<></>)
            }
            <div onClick={()=>setToggleMin(e=>!e)} className="w-10 h-10 hidden sm:block rounded-full cursor-pointer bg-blue-800 ">
            <div className="w-full h-full flex justify-center items-center text-xl text-blue-50  font-bold uppercase" >{
                    
                    session ? session.user?.name.split('')[0] : 'U'
                    
                }</div>
            </div>
            <Link href={'/profile'} className="w-10 h-10 sm:hidden rounded-full cursor-pointer bg-blue-800 flex justify-center items-center">
                <div className="text-xl text-blue-50  font-bold uppercase " >{
                    
                    session ? session.user?.name.split('')[0] : 'U' 
                    
                }</div>
            </Link>
        </nav>

            ) : (

                <nav className="flex gap-3 items-center">
                    <Link href={'/register'} className="--but-out">Register</Link>
                    <Link href={'/signin'} className="--but">Sign in</Link>
                </nav>
            )
        }



    </div>);
}