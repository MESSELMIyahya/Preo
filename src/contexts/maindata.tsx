'use client';
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react"


interface CtxType {
    setNew : ()=>void;
    stopNew : ()=>void;
    isNew : boolean ;
    userInfo:userInfo | null;
    
}
interface userInfo {
    Name:string;
    Image:string;
    Desq:string;
    Tag:string;
} 

export const MainDataCtx = createContext<CtxType>({} as CtxType)

export default function  MainDataContextProvider ({children}:{children:React.ReactNode}){
    const [ isNew , setIsNew ] = useState<boolean>(false);

    const [ userInfo , setUserInfo ] = useState<userInfo|null>(null);
    const { status } = useSession();

    useEffect(()=>{
        if(status == 'authenticated'){
            (async()=>{
                const { data } = await axios.get('/api/profile/getdata');
                data && setUserInfo(data);
            })()
        }
    },[status]);

    
    const setNew = ()=>{
        setIsNew(true);
    }
    const stopNew  = ()=>{
        setIsNew(false);
    }
    
    return(
        <MainDataCtx.Provider value={{setNew,stopNew,isNew,userInfo}}>{children}</MainDataCtx.Provider>
    )
}

export const useNewFetch : ()=> Omit<CtxType,'userInfo'>  = ()=>{
    const {setNew,stopNew,isNew} = useContext(MainDataCtx)
    return {setNew,stopNew,isNew} ;
}

export const useInfo : ()=> userInfo | null = ()=>{
    const {userInfo} = useContext(MainDataCtx)
    return userInfo ;
}