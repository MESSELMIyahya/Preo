const Url = process.env.URL ;

export const GetPostsAll = async (d:any)=>{
    const result = await fetch(`${Url}/api/post/get`, {method: 'POST', body:JSON.stringify(d) , cache:'reload' });
    if (result.ok) {
      return result.json();
    }
    return [];
}