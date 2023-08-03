import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";

export default function UserFormEdit(){
    //get api urld
    const apiUrl = import.meta.env.VITE_API_URL

    //get is from url query params
    const params = useParams();
    let userId = null;
    if(params.userId !== undefined){
        userId = params.userId
    }

    //get user data if id is not empty
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const res = await fetch(`${apiUrl}/user/${userId}`, {
                method: 'GET'
            })
            
            return await res.json();
        },
    })

    if(isLoading) return <div>Loading...</div>

    if(isError) return <div>{ error }</div>

    const user = data.data[0]

    return (
        <>
            <UserForm user={{
                id: user.id,
                full_name: user.full_name,
                email_address: user.email_address,
            }}/>
        </>
    );
}