import { connect } from "mongoose";


export async function ConnectToDb (){
    try{
        await connect(process.env.MONGODB_URI as string,{
            dbName:"Preo"
        });
        console.log('connected');
        return true
    }catch(err){
        console.log('err in connection');
        throw err 
    }
}