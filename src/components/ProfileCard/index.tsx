import Post from "../Post";




export default function ProfileCard() {
    return (<div className="w-[45em] md:w-[37em] mb-4 sm:px-4">

        <div className="w-full --crd rounded-xl p-4 mb-3">

            <div className="w-full h-[8em] sm:h-[10em] rounded-xl bg-blue-500"></div>

            <div className="w-full flex gap-2 px-6 md:px-4 sm:flex-wrap sm:items-center sm:justify-center  py-2 pb-4">

                <div className="w-[8em] h-[8em] sm:w-[12em] sm:h-[12em] bg-blue-600 shadow-md rounded-full mt-[-4em] sm:mt-[-8em]">

                </div>
                <div className="w-[80%] md:w-[74%] sm:w-full flex justify-between sm:justify-center sm:flex-col items-center">

                <div className="sm:mb-3 sm:text-center">
                    <h2 className="text-4xl text-neutral-900 font-medium sm:text-[2.7em]">Yahya Messelmi</h2>
                    <p className="text-lg sm:text-xl text-neutral-500 font-medium">@webdev</p>
                </div>


                <div className="">

                    <button className="--but sm:text-xl">Post</button>

                </div>

                </div>
            </div>

        </div>

        <div className="w-full flex justify-between gap-5 sm:block">

            <div className="w-2/5 sm:w-full sm:mb-3 --crd h-max rounded-xl p-4 text-center">
                <h4 className="text-xl sm:text-2xl text-neutral-800  font-medium mb-3">About</h4>
                <p className="text-lg sm:text-xl leading-5 text-neutral-500 font-medium">I'm the best web dev who made a lot of good thing i'm the web 
                    community
                </p>
            </div>

            <div className="w-3/5 sm:w-full flex flex-wrap gap-5 sm:gap-3">

                <Post Author={{Image:'',Name:"Yahya Messelmi",Tag:"@webdev"}} Date="10/10/2005" 
                Text="Hi From Anywhere idont care cuz i hate all of you :|" FullSize key={39} />

<Post Author={{Image:'',Name:"Yahya Messelmi",Tag:"@webdev"}} Date="10/10/2005" 
                Text="changing thing is react is the best even if hated it but well , what're we gonna do keep it simple and without any outcomes like it ,if it was bad :) " FullSize key={39} />



            </div>

        </div>


    </div>);
}