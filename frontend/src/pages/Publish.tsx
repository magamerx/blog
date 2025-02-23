import { ChangeEvent, useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate=useNavigate();

    return <div>
        <AppBar></AppBar>
        <div className="flex flex-col justify-center items-center">
            <input onChange={(e) => {
                setTitle(e.target.value);
            }} type="text" className="mt-8 w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " placeholder="Title" />
            <TextArea onChange={(e) => {
                setContent(e.target.value);
            }}></TextArea>

            <button onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                },{
                    headers:{
                        Authorization: localStorage.getItem("token")
                    }
                })

                navigate(`/blog/${response.data.id}`);

            }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish post
            </button>
        </div>

    </div>

}

function TextArea({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return <div className="w-1/2 mt-4">
        <textarea onChange={onChange} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your contens here..."></textarea>

    </div>
}