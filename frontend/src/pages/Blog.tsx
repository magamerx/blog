import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/Hooks"
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <AppBar></AppBar>
            <div className="h-screen flex justify-center items-center">
                <Spinner></Spinner>
            </div>
        </div>
    }

    return <div className="">
        <AppBar></AppBar>
        <FullBlog blog={blog}></FullBlog>
    </div>
}