/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function User({ user }){
    const apiUrl = import.meta.env.VITE_API_URL

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => {
            return fetch(`${apiUrl}/user/${user.id}`, {
                method: 'DELETE'
            })
        },
        onSuccess: () => {
            //update list
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        }
    })

    const deleteUser = () => {
        const confirm = window.confirm(`Delete ${user.full_name}?`)
        if(confirm){
            deleteMutation.mutate(user.id)
        }
    }

    return (
        <div className="bg-slate-50 p-4 mb-4 rounded-md shadow-md" key={user.id}>
            <div className="font-bold">{ user.full_name }</div>
            <div>{ user.email_address }</div>
            <div className="flex mt-4 gap-4">
                {
                    !deleteMutation.isLoading ? (
                        <Link to={`/edit/${user.id}`} className="bg-gray-200 rounded-lg px-4 py-1 text-sm hover:bg-gray-100 hover:drop-shadow-md ease-in duration-100">Edit</Link>
                    ) : null
                }
                <button onClick={deleteUser} disabled={ deleteMutation.isLoading } type="button" className="bg-red-100 rounded-lg px-4 py-1 text-sm hover:bg-red-50 hover:drop-shadow-md ease-in duration-100">Delete</button>
            </div>
        </div>
    );
}