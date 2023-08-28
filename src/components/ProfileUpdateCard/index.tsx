'use client';
import { useInfo } from "@/contexts/maindata";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm , SubmitHandler } from "react-hook-form";

interface FormType {
    Name:string;
    Tag:string;
    Decq:string;
}


export default function ProfileUpdateCard() {
    const user = useInfo();
    const [err,setErr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register , handleSubmit , resetField , setValue } = useForm<FormType>();

    useEffect(()=>{

        if(user){
            setValue('Name',user.Name);
            setValue('Tag',user.Tag);
            setValue('Decq',user.Desq);

        }

    },[user])

    const HandleSaveChanges : SubmitHandler<FormType> = async (e)=>{
        setErr('');
        if (e.Decq.length < 20 ) {
            setErr('The description should more then 20 letter');
            return ;
        }else if (e.Decq.length > 240){
            setErr('The description should less then 240 letter');
            return ;
        }
        setIsLoading(true);

        
        try {
            if(!user) throw '' ;
            
            const d = {
                Desq:e.Decq,
                Tag:e.Tag,
                Name:e.Name
            }
            const r = await axios.put('/api/profile/change',d); 
            setIsLoading(false);
            
            router.push('/');

        } catch (err) {
            setIsLoading(false);
            setErr("Something want wrong !");
            console.log(err);
            return
        }


    }

    return (
    <div className="w-[33em] --crd p-3">
        <div className="w-full flex justify-center ">
            <h3 className="text-2xl font-medium text-neutral-900 uppercase mb-3">Edit Info</h3>
        </div>

        <form onSubmit={handleSubmit(HandleSaveChanges)} className="w-full mb-1">
            <div className="w-full flex items-center gap-2 justify-between">
            <input   {...register('Name', { required: true })} className="--input w-[49%] mb-3" type="text" placeholder="Name" />
            <input   {...register('Tag', { required: true })} className="--input  w-[49%] mb-3" type="text" placeholder="Tag" />

            </div>
            <textarea {...register('Decq', { required: true })}  className="w-full h-[13em] --input resize-none" placeholder="Poe"></textarea>

            {
                    err ? (
                        <div className="full my-2 py-2 px-3 rounded-md bg-red-200 text-sm text-red-700">
                            {err}
                        </div>
                    ) : (<></>)
            }

        <button type="submit" disabled={isLoading} className="w-full rounded-md --but flex justify-center">
            {
            isLoading ?(
                <div className="w-5 h-5 m-[2px] rounded-full border-[3px] border-solid border-blue-500 border-r-transparent animate-spin"></div>
            ) :(<>Save changes</>)
            }
        </button>
        </form>


    </div>);
}