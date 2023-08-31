import StartPage from "@/components/StartPage";
import HomePosts from "@/components/Home";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
// import axios from "axios";
import { GetPostsAll } from "@/libs/posts";



export default async function Home() {
  const user = await getServerSession(AuthOptions as {});

  if(user){ 
    const res = await GetPostsAll(user);
    return (<HomePosts posts={res.all} followPosts={res.follow} name={user.user?.name || 'username'} />);
  }else {
    return (<StartPage/>);
  }
}
