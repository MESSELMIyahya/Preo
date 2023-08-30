'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm , SubmitHandler } from 'react-hook-form';
import {useRouter} from "next/navigation"


interface FormType  {
    Email:string;
    Password:string;
}


export default function SignInCrd (){

    const [err, setErr] = useState('');
    const { register,handleSubmit,resetField } = useForm<FormType>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    

    const HandleSubmitSignIn : SubmitHandler<FormType> = async (e)=>{
        setErr('');
        setIsLoading(true);

        try {

            const res = await signIn('credentials',{
                redirect:false,
                email:e.Email,
                password:e.Password
            });

            if(res?.error){
                setIsLoading(false);
                setErr('The email of password is wrong !');
                resetField('Password');
                return ;
            }

            if(res?.ok){
                setIsLoading(false);
                router.refresh();
                router.push('/');
                return ;
            }

        } catch (err) {
            setIsLoading(false);
            setErr("Something want wrong !");
            console.log(err);
            return
        }
    }




    return(<div className="w-[23em] px-6 --crd rounded-md overflow-hidden ">
        
        <div className="w-full text-center flex justify-center items-center h-[8em]">
            <div className="text-center">
                <h4 className="text-3xl text-neutral-900 font-bold uppercase">SignIn</h4>
                <span className="text-sm text-neutral-500 ">
                    Be One Of The Family
                </span>

            </div>
        </div>
    
        <div className="w-full p-3  mb-5">

            <form onSubmit={handleSubmit(HandleSubmitSignIn)}>
            
             <input {...register('Email',{required:true})} className="--input w-full mb-3" type="email" placeholder="Email" />
             <input {...register('Password',{required:true})} className="--input w-full " type="password" placeholder="Password" />

            

                {
                    err ? (
            <div className="full my-2 py-2 px-3 rounded-md bg-red-200 text-sm text-red-700">
                The Email Is Wrong
            </div>
                    ) :(<></>)
                }

            <div className="w-full justify-center mt-3">
                <button disabled={isLoading} type='submit' className="--but w-full flex justify-center rounded-md">
                        {
                            isLoading ? (
                                <div className="--spr"></div>
                            ) : (<>SignIn</>)

                        }
                    </button>
            </div>
            
            
            
            </form>

            <div className="w-full my-2 ">
                <p className="text-sm text-neutral-900">
                    You don't have an account you can <Link href="/register" className="text-blue-500">register</Link>
                </p>
            </div>

            <div className="w-full border-neutral-200 border-t-2 border-solid my-3"></div>

            <div className="w-full">

            <div className="w-full rounded-md cursor-pointer bg-blue-500 py-3 flex justify-center text-base text-white font-bold mb-2">
                Continue with Google
            </div>
            <div className="w-full rounded-md cursor-pointer bg-blue-800 py-3 flex justify-center text-base text-white font-bold mb-2">
                Continue with Facebook
            </div>
            <div className="w-full rounded-md cursor-pointer bg-gray-900 py-3 flex justify-center text-base text-white font-bold">
                Continue with GitHub
            </div>

            </div>

        </div>

    
    </div>)
}