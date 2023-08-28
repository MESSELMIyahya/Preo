import Link from "next/link";


interface Props {
    Text: string;
    date: string;
    Author: {
        Name: string;
        Tag: string;
        Image: string;
    }
    FullSize?:boolean
}


export default function Post({ FullSize, Author,date,Text }: Props) {

    const g = Intl.DateTimeFormat('en',{
        dateStyle:'short'
    })
    const Fd = g.format(new Date(date))

    return (<>
        <div style={{width:FullSize ? '100%':'26em'}} className="w-[26em] --crd p-4">

            <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex justify-center items-center">
                    <div className=" items-center text-xl text-blue-50  font-bold uppercase" >{
                    
                    Author.Name.split('')[0] 
                    }</div>
                    </div>
                    <div className="">
                        <Link href={`/profile/${Author.Name}`} className="text-xl block leading-5 text-neutral-900 font-medium ">
                           {Author.Name}
                        </Link>
                        <span className="text-sm text-neutral-400 font-medium ">
                        {Author.Tag}
                        </span>
                    </div>

                </div>

                <span className="text-md text-neutral-400 font-medium">{ Fd }</span>

            </div>

            <div className="w-full  ">
                <p className="text-[1.1em]  flex text-neutral-900">
                  {Text}
                </p>
            </div>

            <div className="w-full flex justify-between">

            </div>


        </div>
    </>)
}