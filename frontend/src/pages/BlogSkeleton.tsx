import { Circle } from "../components/BlogCard"

export const BlogSkeleton = ()=>{
    return   <div role="status" className="w-2/3 animate-pulse">
        <div className="">
                    <div className="text-gray-600 py-4 flex flex-row items-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-full   w-48 mb-4"></div>
                    <span className="text-black px-1">
                    <div className="h-2 bg-gray-200 rounded-full     mb-2.5"></div>
                    </span>
                        <Circle></Circle>
                        <span className="px-1">
                        <div className="h-2 bg-gray-200 rounded-full     mb-2.5"></div>
                        </span>
                    </div>
        
                    <div className="text-2xl font-bold pb-2">
                    <div className="h-2 bg-gray-200 rounded-full     mb-2.5"></div>
                    </div>
                    <div className="text-slate-800">
                    <div className="h-2 bg-gray-200 rounded-full     mb-2.5"></div>
                    </div>
        
                    <div className="text-slate-800 text-sm pt-2">
                    <div className="h-2 bg-gray-200 rounded-full     mb-2.5"></div>
                    </div>
                </div>

        <span className="sr-only">Loading...</span>
    </div>
    
    
}