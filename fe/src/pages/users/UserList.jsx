import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import User from "./User";

export default function UserList(){
    const apiUrl = import.meta.env.VITE_API_URL
    const [parent] = useAutoAnimate(/* optional config */)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${apiUrl}/user`, {
                method: 'GET'
            })
            return await res.json()
        }
    })

    if(isLoading){
        return (<div className="pulse">Loading Users...</div>)
    }

    if(isError){
        return <div className="bg-red-200 p-3 rounded-lg">{ error }</div>
    }

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <div className="text-xl font-bold">User List</div>
                <Link to={`/add`} className="bg-gray-100 px-4 py-2 hover:bg-gray-200 hover:drop-shadow-md ease-in duration-100">Add New</Link>   
            </div>

            {
                data.data.length > 0 ? (
                    <div ref={parent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {
                            data.data.map(user => (
                            <User user={user} key={user.id}/>
                            ))
                        }
                    </div>
                ) : (
                    <div className="text-center text-slate-500">No data...</div>
                )
            }

           
        </>
    );
}