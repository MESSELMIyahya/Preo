import Link from "next/link";



export default function StartPage(){
    return(
    <section className="w-full mt-[12em] ">
        <div className="w-full flex justify-center">

            <h2 className="w-[56%] md:w-[64%] sm:w-[85%] text-7xl md:text-5xl  text-center uppercase font-extrabold text-neutral-950 text-white"><span className="text-blue-600">PREO</span> Is Your Home To Post <span className="text-blue-800 underline">Start Now</span></h2>

        </div>
        <div className="w-full flex justify-center mt-12 gap-5">

         <button className="--but text-2xl md:text-xl font-bold w-[14em] py-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-900 ">Start Now</button>

        </div>
    </section>);
}