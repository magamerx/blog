import { ChangeEvent } from "react"


interface LabelledInputType {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export const InputBox = ({ label, placeholder, onchange, type }: LabelledInputType) => {
    return <div className="py-2">
        <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
        <input onChange={onchange} type={type || "text"} id="first_name" className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}