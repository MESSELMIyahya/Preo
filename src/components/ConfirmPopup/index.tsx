interface Props {
    title:string;
    dsq:string;
    handleClick:(n:boolean)=>void;
    isLoading:boolean
}


export default function ConfirmPopup ({dsq,title,handleClick,isLoading}:Props){   
    return(<div  className="-popup-bg">

        <div onClick={()=>handleClick(false)} className="w-full absolute h-full flex justify-center items-center z-[43]">
        </div>

        <div className="--crd  p-3 px-5  rounded-xl z-[44]">                
            <h3 className="text-2xl text-center text-neutral-800   mb-2">{title}</h3>
            <div className="w-[20em] flex justify-center">
            <p className="text-base text-center text-neutral-600 font-medium mb-4">{dsq}</p>
            </div>
            <div className="w-full flex justify-center items-center gap-3 ">
                <button onClick={()=>handleClick(true)} disabled={isLoading} className="--but w-[8em] flex justify-center">
                    {
                        isLoading ? (
                            <div className="--spr"></div>
                        ) : (<>Delete</>)
                    }
                </button>
                <button  onClick={()=>handleClick(false)} className="--but-out w-[8em] bg-neutral-200">Cancel</button>
            </div>
        </div>

    </div>)
}

