'use client';
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react"


interface CtxType {
    setNew : ()=>void;
    stopNew : ()=>void;
    setPostMod:(d:{ prm: string ,mod: "create" | "update"})=> void  ;
    setSomePostData :<T>(data:T)=>void,
    somePostData:any,
    postMod:{prm:string,mod:'create'|'update'};
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
    const [ postMod , setPostMod ] = useState<{prm:string,mod:'create'|'update'}>({prm:"",mod:'create'})
    const [ somePostData , setSomePostData ] = useState<any>(null)

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
    
    return(<>
        <MainDataCtx.Provider value={{setNew,setPostMod,setSomePostData,stopNew,somePostData,postMod,isNew,userInfo}}>{children}</MainDataCtx.Provider>
    
   </> )
}

export const useNewFetch : ()=> Omit<CtxType,'userInfo'>  = ()=>{
    const {setNew,stopNew,isNew} = useContext(MainDataCtx)
    return {setNew,stopNew,isNew} ;
}

export const useInfo : ()=> userInfo | null = ()=>{
    const {userInfo} = useContext(MainDataCtx)
    return userInfo ;
}

export const usePostMod : ()=> {
    mod:'create' | 'update' ,
    prm:string,
    setPostType : (mod:'create'|'update',prm?:string)=>void,
    setData:<T>(Data:T)=>void ,
    data:any,
    reset:()=>void,
} = ()=>{
    const { postMod , setPostMod , setSomePostData , somePostData} = useContext(MainDataCtx);   

    const setPostType = (mod:'create'|'update',prm:string = '')=>{
        setPostMod({mod,prm});
    }

    const reset :()=>void = ()=>{
        setPostMod({mod:'create',prm:''});
        setSomePostData(null)
    }

    const setData : <T>(Data:T)=>void = (Data)=>{
        setSomePostData(Data);
    }

    return { mod:postMod.mod , setData , data:somePostData , prm : postMod.prm , setPostType , reset }
}