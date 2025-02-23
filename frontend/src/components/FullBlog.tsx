import { BlogProps } from "../hooks/Hooks"

export const FullBlog = ({ blog }: { blog: BlogProps }) => {
    return <div>
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-12 px-20 max-w-full max-w-screen-xl pt-8">

                <div className="col-span-8">
                    <div className="flex flex-col">
                        <h1 className="text-5xl font-bold pb-2">{blog.title}</h1>
                        <p className="text-slate-600 pb-4">Posted on August 24,2023</p>
                        <p className="">{blog.content}</p>
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="flex flex-col">
                        <p className="text-b pb-6">Author</p>
                        <div className="flex flex-row">
                            <div className="flex justify-center items-center pr-4"><Circle></Circle></div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold pb-2 h-1/2">{blog.author.name || "Anonymous"}</h1>
                                <p className="text-slate-600 h-1/2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, nesciunt!</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

}

function Circle() {
    return <div className="bg-slate-200 rounded-full h-8 w-8">

    </div>
}