import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import { SignupInput } from "@magamerx/medium-common"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
            const res=response.data;
            localStorage.setItem("token",res.jwt);
            navigate("/blogs");
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="h-screen flex flex-row justify-center items-center">
        <div className="w-1/2">
            <div className="flex flex-col justify-center items-center pb-4">
                <div className="text-3xl font-extrabold pb-3">Create an account</div>
                <div className="text-gray-500 font-medium">{type === "signin" ? "Don't have an account" : "Already have an account?"}
                    <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
            </div>

            <div>
                {type === "signup" ? <InputBox label="Username" placeholder="Enter your Username" onchange={(e) => {
                    setPostInputs({
                        ...postInputs, //existing name, username and password
                        name: e.target.value
                    })
                }}></InputBox>

                    : null}

                <InputBox label="Email" placeholder="m@example.com" onchange={(e) => {
                    setPostInputs({
                        ...postInputs, //existing name, username and password
                        username: e.target.value
                    })
                }}></InputBox>

                <InputBox label="Password" placeholder="123456" type="password" onchange={(e) => {
                    setPostInputs({
                        ...postInputs, //existing name, username and password
                        password: e.target.value
                    })
                }}></InputBox>

                <Button onClick={sendRequest}  name={type}></Button>
            </div>
        </div>
    </div>
}