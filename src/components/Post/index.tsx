

interface Props {
    Text: string;
    Date: string;
    Author: {
        Name: string;
        Tag: string;
        Image: string;
    }
    FullSize?:boolean
}


export default function Post({ FullSize, Author,Date,Text }: Props) {
    return (<>
        <div style={{width:FullSize ? '100%':'26em'}} className="w-[26em] --crd p-4">

            <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                    <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
                    <div className="">
                        <h4 className="text-xl leading-5 text-neutral-900 font-medium ">
                           {Author.Name}
                        </h4>
                        <span className="text-sm text-neutral-400 font-medium ">
                        {Author.Tag}
                        </span>
                    </div>

                </div>

                <span className="text-md text-neutral-400 font-medium">{Date}</span>

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