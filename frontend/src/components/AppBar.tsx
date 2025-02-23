import { Avatar } from "./Avatar"
import { Link } from "react-router-dom"

export const AppBar = ()=>{
    return <div className="border-b  border-slate-200 flex flex-row justify-between items-center px-8 py-4">
        <Link to={"/blogs"}>
        <div className="cursor-pointer">Medium</div>
        </Link>
        <div>
            <Link to={"/publish"}>
        <button type="button" className="mr-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
            </Link>
            <Avatar name="magamerx" size={8}></Avatar>
        </div>
    </div>
}