'use client';
import Link from "next/link";
import Post from "../Post";
import FollowBut from "./components/followBut";




export default function ProfileCard({ data,owner,Name,theme }: {theme:[string,string],Name:string, data: UserSchemaType,owner:boolean }) {

    

    return (<div className="w-[45em] md:w-[37em] mb-4 xl:mt-6 2xl:mt-7 sm:px-4">

        <div className="w-full --crd rounded-xl p-4 mb-3">

            <div style={{backgroundImage:`linear-gradient(to right,${theme[0]},${theme[1]})`}} className="w-full h-[9em] sm:h-[13em] rounded-xl z-10 relative flex justify-center items-center sm:items-start">

                
                <h3 className="text-4xl text-neutral-950 text-opacity-40  sm:mt-8">
                  {data.Tag}
                </h3>


               { owner ? (
               <div className="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 flex justify-center items-center">
                   <Link href="/profile/update" > <i className="text-lg sm:text-2xl fill-black opacity-40 transition-colors cursor-pointer hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                    </i></Link>
                </div>
               ) : (<></>) } 
            </div>

            <div className="w-full flex gap-2 px-6 md:px-4 sm:flex-wrap sm:items-center sm:justify-center  py-2 pb-4">

                <div style={{backgroundColor:theme[1]}} className="w-[8em] h-[8em] sm:w-[12em] sm:h-[12em]  flex justify-center items-center z-20 shadow-md rounded-full mt-[-4em] sm:mt-[-8em]">
                    <h5 className="text-7xl text-blue-50  font-bold uppercase">
                        {data.Name.split('')[0]}
                    </h5>
                </div>
                <div className="w-[80%] md:w-[74%] sm:w-full flex justify-between sm:justify-center sm:flex-col items-center">

                    <div className="sm:mb-3 sm:text-center">
                        <h2 className="text-4xl text-neutral-900 font-medium sm:text-[2.7em]">{data.Name}</h2>
                        <p className="text-base sm:text-xl text-neutral-500 font-medium">
                              {
                        data.Followers.length || 0
                    } Follower  
                        </p>
                    </div>


                    <div className="">
                        {
                            owner || data.Name == Name  ? (<Link href={'/postit'} className="--but sm:text-xl block">Post</Link>) : (  <FollowBut name={data.Name} follow={ data?.Followers.includes(Name) } /> )
                        }
                    </div>

                </div>
            </div>

        </div>

        <div className="w-full flex justify-between gap-5 sm:block">

            <div className="w-2/5 sm:w-full sm:mb-3 --crd h-max rounded-xl p-4 text-center">
                <h4 className="text-xl sm:text-2xl text-neutral-800  font-medium mb-3">About</h4>
                <p className="text-lg sm:text-xl leading-5 text-neutral-500 font-medium">{data.Desq}</p>
            </div>

            <div className="w-3/5 sm:w-full flex flex-wrap gap-5 sm:gap-3">

                {
                    data.Posts.length != 0 ? data.Posts.reverse().map(e => <Post color={theme[1]} id={e._id as string} owner={owner} key={e.Text} Author={e.Author} date={e.Date} Text={e.Text} FullSize />) : data.Posts ? 
                    (
                        <>
                            No Posts here
                        </>
                    )
                    : 
                    (<>

                        <div className="w-12 h-12 border-[6px] border-opacity-70 animate-spin  rounded-full border-white border-solid  border-l-transparent"></div>

                    </>) 
                }

            </div>

        </div>


    </div>);
}