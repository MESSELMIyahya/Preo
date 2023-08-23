'use client'

import Link from 'next/link';
import { useState } from 'react';


export default function RegisterCrd (){

    const [err,setErr] = useState(false);



    return(<div className="w-[23em] px-6 --crd rounded-md overflow-hidden ">
        
        <div className="w-full text-center flex justify-center items-center h-[8em]">
            <div className="text-center">
                <h4 className="text-3xl text-neutral-900 font-bold uppercase">SignUp</h4>
                <span className="text-sm text-neutral-500 ">
                    Be One Of The Family
                </span>

            </div>
        </div>
    
        <div className="w-full p-3  mb-5">

            <form className="">

            <input className="--input w-full mb-3" type="text" placeholder="Name" />
             <input className="--input w-full mb-3" type="email" placeholder="Email" />
             <input className="--input w-full mb-3" type="password" placeholder="Password" />
             <input className="--input w-full " type="password" placeholder="Confirm Password" />
            </form>

                {
                    err ? (
            <div className="full my-2 py-2 px-3 rounded-md bg-red-200 text-sm text-red-700">
                The Email Is Wrong
            </div>
                    ) :(<></>)
                }

            <div className="w-full justify-center mt-3">
                <button className="--but w-full rounded-md">Sign up</button>
            </div>

            <div className="w-full my-2 ">
                <p className="text-sm text-neutral-900">
                    You have an account you can <Link href="/signin" className="text-blue-500">sign in</Link>
                </p>
            </div>

            <div className="w-full border-neutral-200 border-t-2 border-solid my-3"></div>


        </div>

    
    </div>)
}