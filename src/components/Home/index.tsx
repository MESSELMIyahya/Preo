'use client';
import { useRouter } from "next/navigation";
import Post from "../Post";
import { createContext, useState } from "react";



interface Props {
    posts:PostSchemaType[],
    followPosts:PostSchemaType[],
    name:string
}

interface HomeCtxType { handlePostsShow:(id:string)=>void } ;

export const HomeCtx =  createContext<HomeCtxType>({} as HomeCtxType);


export default function HomePosts({posts,followPosts,name}:Props){
    const [ showFollow , setShowFollow ] = useState(false);
    const [Posts,setPosts] = useState<PostSchemaType[]>(posts);
    const route = useRouter()

    const handlePostsShow  = (id:string)=>{
        setPosts(e=>e.filter(e=>e._id != id));
        route.refresh();
    }



    return( <HomeCtx.Provider value={{handlePostsShow}}><section className="w-full mt-[8em] sm:mt-[6em] select-none">

    <div className="w-full flex justify-center mb-4 gap-3 items-center">
        <button style={{color:showFollow?'rgb(250 250 250/0.15)':'',cursor:showFollow?'pointer':'auto'}} className="text-xl text-neutral-50 font-semibold" onClick={()=>setShowFollow(false)}>All</button>
        <button style={{color:showFollow?'':'rgb(250 250 250/0.15)',cursor:showFollow?'auto':'pointer'}} className="text-xl text-neutral-50  font-semibold" onClick={()=>setShowFollow(true)}>Following</button>
    </div>
    
    <div className="w-full my-10 sm:px-2 flex justify-center flex-col gap-8 sm:gap-y-3 items-center">

        {
            showFollow ? 
            (<>
            
                {
                    followPosts.length != 0  ? 

                    followPosts.map(e=><Post color={''} id={e._id||''} owner={false} key={e.Text} Author={e.Author} date={e.Date} Text={e.Text} />) : (<>
                    
                           
                        <div className=" text-center ">
                            <h3 className="font-bold text-3xl mb-2 text-neutral-50">Oops</h3>
                            <h4 className="text-xl font-medium text-neutral-200">No Posts</h4>
                        </div>
                        
        
                    </>)
                }
           
            </>) : (<>
            
                {
                    Posts.length != 0  ? Posts.map(e=><Post id={e._id||''} owner={e.Author.Name == name} key={e.Text} Author={e.Author} date={e.Date} Text={e.Text} />) : (<>
                  
                    <div className="--crd w-[10em] p-3 rounded-lg text-center ">
                            <h3 className="font-bold text-3xl mb-1 text-neutral-800">Oops</h3>
                            <h4 className="text-xl font-medium text-neutral-500">No Posts</h4>
                    </div>
        
                    </>)
                }
            
            </>)
        }

        {/* {
            Posts.length == 0 ? (

                <div className="w-12 h-12 border-[6px] border-opacity-70 animate-spin  rounded-full border-white border-solid  border-l-transparent"></div>
            ) : ("")
        } */}


    </div>
    
    </section>
    
   


    </HomeCtx.Provider>);
}