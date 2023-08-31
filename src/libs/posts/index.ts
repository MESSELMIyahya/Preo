

export const GetPostsAll = async (d:any)=>{
    const result = await fetch('http://localhost:3000/api/post/get', {method: 'POST', body:JSON.stringify(d) , cache:'reload' });
    if (result.ok) {
      return result.json();
    }
    return [];
}