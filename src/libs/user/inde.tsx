


export const GetUserProfile = async (d:any)=>{
    const result = await fetch('http://localhost:3000/api/profile/get', {method: 'POST', body:JSON.stringify(d) , cache:'no-store' });
    console.log(result.status);
    
    if (result.ok) {
      return result.json();
    }
    return [];
}


export const GetUserTheme = async (d:any): Promise<{theme:string}|null> => {
  const result = await fetch('http://localhost:3000/api/profile/gettheme', {method: 'POST',body:JSON.stringify(d), cache:'no-store' });
  console.log(result.status);
  
  if (result.ok) {
    return result.json();
  }
  return null;
}



export const GetUserProfileWithName = async (d:{user:any,Name:string})=>{
  const result = await fetch('http://localhost:3000/api/profile/getuser', {method: 'POST', body:JSON.stringify(d) , cache:'no-store' });
  if(result.status == 404){
    return null 
  }
  if (result.ok) {
    return result.json();
  }
  return [];
}

