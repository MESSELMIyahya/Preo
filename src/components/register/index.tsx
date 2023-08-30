'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterFormType } from './type';
import { useRouter } from 'next/navigation'
import axios from 'axios';


export default function RegisterCrd() {

    const [err, setErr] = useState('');
    const { handleSubmit, register, resetField } = useForm<RegisterFormType>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleSubmitRegister: SubmitHandler<RegisterFormType> = async (e) => {
        setErr('');
        if (e.Password !== e.ConPassword) {
            resetField('ConPassword');
            setErr('Passwords are not the same !');
            return ;
        }

        setIsLoading(true);

        try {

            const { data: res } = await axios.get(`/api/userexist/?email=${e.Email}`);

            if (res.is) {
                setIsLoading(false);
                setErr("This email is token !");
                return
            }
            const d = {
                Password:e.Password,
                Email:e.Email,
                Name:e.Name
            }
            const r = await axios.post('api/register',d);
            

            // if (r.status != 201) {
            //     setIsLoading(false);
            //     setErr("Something want wrong !");
            //     return
            // }

            router.push('/signin');

        } catch (err) {
            setIsLoading(false);
            setErr("Something want wrong !");
            console.log(err);
            return
        }
    }


    return (<div className="w-[23em] px-6 --crd rounded-md overflow-hidden ">

        <div className="w-full text-center flex justify-center items-center h-[8em]">
            <div className="text-center">
                <h4 className="text-3xl text-neutral-900 font-bold uppercase">SignUp</h4>
                <span className="text-sm text-neutral-500 ">
                    Be One Of The Family
                </span>

            </div>
        </div>

        <div className="w-full p-3  mb-5">

            <form onSubmit={handleSubmit(handleSubmitRegister)}>

                <input   {...register('Name', { required: true })} className="--input w-full mb-3" type="text" placeholder="Name" />
                <input  {...register('Email', { required: true })} className="--input w-full mb-3" type="email" placeholder="Email" />
                <input  {...register('Password', { required: true })} className="--input w-full mb-3" type="password" placeholder="Password" />
                <input  {...register('ConPassword', { required: true })} className="--input w-full " type="password" placeholder="Confirm Password" />

                {
                    err ? (
                        <div className="full my-2 py-2 px-3 rounded-md bg-red-200 text-sm text-red-700">
                            {err}
                        </div>
                    ) : (<></>)
                }

                <div className="w-full justify-center mt-3">
                    <button disabled={isLoading} type='submit' className="--but w-full flex justify-center rounded-md">
                        {
                            isLoading ? (
                                <div className="--spr"></div>
                            ) : (<>Sign up</>)

                        }
                    </button>
                </div>

                <div className="w-full my-2 ">
                    <p className="text-sm text-neutral-900">
                        You have an account you can <Link href="/signin" className="text-blue-500">sign in</Link>
                    </p>
                </div>

                <div className="w-full border-neutral-200 border-t-2 border-solid my-3"></div>

            </form>



        </div>


    </div>)
}