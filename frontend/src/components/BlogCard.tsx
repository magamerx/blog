import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps {
    id:string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link className="border-b border-slate-200 pb-4 w-2/3 cursor-pointer" to={`/blog/${id}`}>
        <div className="">
            <div className="text-gray-600 py-4 flex flex-row items-center">
                <Avatar name={authorName} size={6}></Avatar>
                <span className="text-black px-1">
                    {authorName}
                </span>
                <Circle></Circle>
                <span className="px-1">
                    {publishedDate}
                </span>
            </div>

            <div className="text-2xl font-bold pb-2">
                {title}
            </div>
            <div className="text-slate-800">
                {content.slice(0, 100) + "..."}
            </div>

            <div className="text-slate-800 text-sm pt-2">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="w-0.5 h-0.5 rounded-full bg-slate-600"></div>
}