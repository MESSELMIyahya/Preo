'use client'
import { useState } from "react";



export default function CreateForm (){

    const [ isLoading ,setIsLoading ] = useState(false);

    return(<>
    
    <div className="w-[33em] --crd p-3">
        <div className="w-full flex justify-center ">
            <h3 className="text-2xl font-medium text-neutral-900 uppercase mb-3">Create Post</h3>
        </div>
        <div className="w-full mb-1">
            <textarea className="w-full h-[17em] --input resize-none" placeholder="Post Message"></textarea>
        </div>
        <button onClick={()=>setIsLoading(true)} disabled={isLoading} className="w-full rounded-md --but flex justify-center">
            {
                isLoading ?(
                    <div className="w-6 h-6 rounded-full border-[3px] border-solid border-blue-500 border-r-transparent animate-spin"></div>
                ) :(<>Post</>)

            }
            </button>
    </div>
        
    </>)
}