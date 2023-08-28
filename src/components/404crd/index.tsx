import Link from "next/link";





export default function Card404(){

    return(<div className="w-[45em] md:w-[37em] mb-4 sm:px-4 justify-center items-center flex">

        <div className="w-full text-center">
        <h3 className="text-6xl text-blue-800 font-bold text-opacity-30">404</h3>
        <h2 className="text-7xl text-blue-50 font-medium mt-2">User Not Found :( </h2>
        <div className="w-full flex justify-center">
        <Link href={'/'}  className="text-2xl block text-neutral-950 hover:underline mt-4 font-medium">Go Home</Link>

        </div>
        </div>
    
    </div>);

}