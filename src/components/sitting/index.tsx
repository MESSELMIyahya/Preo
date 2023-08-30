'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const colorsList: [string, string][] = [
    ["#06b6d4", "#3b82f6"],
    ["#22c55e", "#10b981"],
    ["#f9a8d4", "#c084fc"],
    ["#cbd5e1", "#64748b"],
    ["#404040", "#171717"],
    ["#fb923c", "#f87171"]
]

interface Props {
    Close:()=>void,
    df:number;
}

export default function Sitting({Close,df}:Props) {
    const router = useRouter();

    const [colorN , setColorN ] = useState(df?df:0);


    const handleSubmitColor = async (n:number)=>{
        setColorN(n);
        try{
        const res = await axios.post('/api/profile/settheme',{theme:n.toString()})
        router.refresh()
        }catch(err){
            console.log(err);
            Close(false);
        }
    }


    return (<div className="-popup-bg p-3">
        <div onClick={()=>Close(false)} className="w-full absolute h-full flex justify-center items-center z-[43]">
        </div>

        <div className="--crd p-3 px-4 rounded-xl z-[44] w-[30em]">

            <h3 className="text-2xl text-neutral-950 text-center ">Sitting</h3>

            <div className="w-full my-1">
                <div className="text-xl text-neutral-900 font-medium mb-4">Color Theme :</div>
                <div className="w-full rounded-xl bg-neutral-100 p-4 px-2 flex flex-wrap gap-x-4 gap-3 ">

                    {
                        colorsList.map((e,i) => 
                        <div 
                        onClick={()=>handleSubmitColor(i)}
                        style={{ borderColor:colorN==i?'#171717':'',cursor:colorN == i ? '' : 'pointer',backgroundImage:`linear-gradient(to right ,${e[0]},${e[1]})` }}
                        className="rounded-md w-[6em] py-4 transition-colors border-2  border-solid"></div>)
                    }




                </div>
            </div>
        </div>
    </div>);
}