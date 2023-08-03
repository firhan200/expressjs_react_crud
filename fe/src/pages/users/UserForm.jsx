/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserForm({ user }){
    const userData = typeof user !== 'undefined' ? user : {}

    //get api urld
    const apiUrl = import.meta.env.VITE_API_URL

    //init navigation
    const navigate = useNavigate();

    //init queryclient to invalidate/refresh users
    const queryClient = useQueryClient()

    //local states
    const userId = typeof userData.id !== 'undefined' ? userData.id : null;
    const [fullName, setFullName] = useState(typeof userData.full_name !== 'undefined' ? userData.full_name : '');
    const [emailAddress, setEmailAddress] = useState(typeof userData.email_address !== 'undefined' ? userData.email_address : '');

    //add or edit mutation here
    const mutation = useMutation({
        mutationFn: ({ id, fullName, emailAddress }) => {
            return fetch(`${apiUrl}/user${ id !== null ? `/${id}` : '' }`, {
                method: id !== null ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email_address: emailAddress
                })
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })

            return navigate('/')
        }
    })

    //submit form function
    const submit = e => {
        e.preventDefault()

        //call mutate
        mutation.mutate({
            id: userId,
            fullName: fullName,
            emailAddress: emailAddress
        })
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Link to={`/`} className="bg-gray-300 px-4 py-2 hover:bg-gray-200 hover:drop-shadow-md ease-in duration-100">Back</Link>
                <div className="text-xl font-bold">User Form</div>
            </div>
            <form onSubmit={submit} className="my-6 items-center grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                    <div className="text-bold lg:w-40">Full Name</div>
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required maxLength={150} placeholder="John Doe" className="bg-gray-200 p-2 w-full focus:outline-gray-400 outline-1" disabled={mutation.isLoading}/>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                    <div className="text-bold lg:w-40">Email Address</div>
                    <input type="text" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} required maxLength={150} placeholder="john.doe@email.com" className="bg-gray-200 p-2 w-full focus:outline-gray-400 outline-1" disabled={mutation.isLoading}/>
                </div>
                <div className="text-center lg:text-start md:text-end md:col-span-2 lg:col-span-1">
                    <button type="submit" className="bg-gray-300 px-4 py-2" disabled={mutation.isLoading}>
                        { mutation.isLoading ? 'Submitting...' : 'Submit' }
                    </button>
                </div>
            </form>
        </>
    );
}