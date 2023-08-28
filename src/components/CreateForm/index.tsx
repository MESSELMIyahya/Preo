'use client'
import { useNewFetch } from "@/contexts/maindata";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";



export default function CreateForm (){
    const {data:session} = useSession();
    const router = useRouter();
    const { setNew } = useNewFetch()

    const [ isLoading ,setIsLoading ] = useState(false);
    const [ err , setErr ] = useState('');

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const HandleAddPost = async ()=>{
        setErr('');
        if(textareaRef.current?.value.length < 10){
            setErr('The post should be more then 10 characters');
            textareaRef.current?.focus();
            return;
        }
        setIsLoading(true);
        try{
            await axios.post('/api/post/create',{Email:session?.user?.email,Text:textareaRef.current?.value});
            setNew(true);
            router.push('/');
        }catch(err){
            setIsLoading(false);
            setErr("Something want wrong !");
            console.log(err);
            return
        }
    }
    
    return(<>
    
    <div className="w-[33em] --crd p-3">
        <div className="w-full flex justify-center ">
            <h3 className="text-2xl font-medium text-neutral-900 uppercase mb-3">Create Post</h3>
        </div>
        <div className="w-full mb-1">
            <textarea ref={textareaRef} className="w-full h-[17em] --input resize-none" placeholder="Post Message"></textarea>
            {
                    err ? (
                        <div className="full my-2 py-2 px-3 rounded-md bg-red-200 text-sm text-red-700">
                            {err}
                        </div>
                    ) : (<></>)
            }
        </div>
        <button onClick={()=>HandleAddPost()} disabled={isLoading} className="w-full rounded-md --but flex justify-center">
        {
                isLoading ?(
                    <div className="w-5 h-5 m-[2px] rounded-full border-[3px] border-solid border-blue-500 border-r-transparent animate-spin"></div>
                ) :(<>Post</>)

                 }
            </button>
    </div>
        
    </>)
}