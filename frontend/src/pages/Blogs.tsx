import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks/Hooks"
import { BlogSkeleton } from "./BlogSkeleton"

export const Blogs=()=>{
    const {loading,blogs}=useBlogs();

    if(loading){
        return <div className="">
        <AppBar></AppBar>
        <div className="flex flex-col items-center">
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
        </div>
    </div>
    }

    return <div className="">
        <AppBar></AppBar>
        <div className="flex flex-col items-center">
            {blogs.map(blog=> <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"}></BlogCard>)}
        </div>
    </div>
}