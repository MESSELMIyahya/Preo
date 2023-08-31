'use client'; 

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { usePostMod } from "@/contexts/maindata";
import { useRouter } from "next/navigation";
import Sitting from "../sitting";

export default function Header({session,state:status,colorNumber}:{colorNumber:number,state:string,session:any}) {

    const [toggleMin ,setToggleMin] = useState(false);
    const [ toggleSitting , setToggleSitting ] = useState<boolean>(false)
    const { reset } = usePostMod();
  

    return (<>

    {
        toggleSitting ? (<Sitting df={colorNumber} Close={()=>setToggleSitting(false)} />) : (<></>)
    }

    {/*  */}

        {
            session ? ( 
            <div onClick={()=>setToggleSitting(true)} className="fixed bottom-3 sm:hidden left-3 bg-neutral-900 bg-opacity-20 w-10 h-10 rounded-xl flex justify-center items-center cursor-pointer transition-colors hover:bg-opacity-10">
        <i className="text-2xl fill-neutral-800 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
        </i>   </div>
    ) : (<></>)

        }
    
    {
          toggleMin ? (
            <div onClick={()=>setToggleMin(false)} className="fixed hidden sm:block top-0 left-0 w-full h-[100vh]  z-[36]"></div>
          ) :(<></>)
    }
   


    <div className="w-full fixed flex  justify-between items-center top-0 left-0 py-3 p-8 z-40 bg-neutral-500 bg-opacity-10 backdrop-blur-md border-solid border-neutral-100 border-opacity-10 border-b-[1px]">
        <Link href={'/'} onClick={()=>reset()} className="text-3xl select-none text-white font-bold ">P<span className="text-neutral-800">REO</span><span className="text-blue-600"></span></Link>

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
                <Link href={'/postit'} onClick={()=>reset()} className="--but">Add post</Link>
            </div>
            {
            toggleMin ? (

            <div className="w-[10em] hidden gap-3 items-center absolute sm:flex flex-wrap top-[110%] right-1 --border --crd shadow-lg --border2 p-1">

            <ul  className="flex flex-col w-full ">
                
               

                <Link href={'/profile'} onClick={()=>setToggleMin(false)} ><li className="w-full p-2 py-1 rounded-md cursor-pointer flex items-center gap-4 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-lg fill-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/></svg>
                    </i>
                    <p className="text-neutral-700 text-lg font-medium">Profile</p>
                </li> </Link>

                <Link href={'/postit'} onClick={()=>setToggleMin(false)} ><li className="w-full p-2 py-1 rounded-md cursor-pointer flex items-center gap-4 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-lg fill-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </i>
                    <p className="text-neutral-700 text-lg font-medium">New Post</p>
                </li></Link>

                <li onClick={()=>{setToggleMin(false);setToggleSitting(true);}} className="w-full p-2 py-1 rounded-md cursor-pointer flex items-center gap-4 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-lg fill-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                    </i>
                    <p className="text-neutral-700 text-lg font-medium">Sitting</p>
                </li>

                 <li onClick={()=>signOut()}  className="w-full p-2 py-1 rounded-md cursor-pointer flex items-center gap-4 hover:bg-neutral-100 active:bg-neutral-50 ">
                    <i className="text-lg fill-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                    </i>
                    <p className="text-neutral-700 text-lg font-medium">Sign Out</p>
                </li>

            </ul>

            </div>
                ) 
                
                : (<></>)
            }
            <div onClick={()=>setToggleMin(e=>!e)} className="w-10 h-10 hidden sm:block rounded-full cursor-pointer bg-neutral-800 ">
            <div className="w-full h-full flex justify-center items-center text-xl text-white  font-bold uppercase" >{
                    
                    session ? session.user?.name.split('')[0] : 'U'
                    
                }</div>
            </div>
            <Link href={'/profile'} className="w-10 h-10 sm:hidden rounded-full cursor-pointer bg-neutral-800 flex justify-center items-center">
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



    </div></>);
}