const Url = process.env.NEXTAUTH_URL ;


export const GetUserProfile = async (d:any)=>{
    const result = await fetch(`${Url}/api/profile/get`, {method: 'POST', body:JSON.stringify(d) , cache:'no-store' });
    if (result.ok) {
      return result.json();
    }
    return [];
}


export const GetUserTheme = async (d:any): Promise<{theme:string}|null> => {
  const result = await fetch(`${Url}/api/profile/gettheme`, {method: 'POST',body:JSON.stringify(d), cache:'no-store' });
  
  if (result.ok) {
    return result.json();
  }
  return null;
}



export const GetUserProfileWithName = async (d:{user:any,Name:string})=>{
  const result = await fetch(`${Url}/api/profile/getuser`, {method: 'POST', body:JSON.stringify(d) , cache:'no-store' });
  if(result.status == 404){
    return null 
  }
  if (result.ok) {
    return result.json();
  }
  return [];
}

