'use client'
import { clearAuthCookies } from "@/@/api/auth";
import { useAppDispatch } from "@/@/app/store/hooks";
import { postRequest } from "@/@/service/api-handler/post-manager";
import { useFormStatus } from "react-dom";
import { logout } from "@/@/app/store/authSlice";
import { useRouter } from "next/navigation";

async function logoutRequest() {
    const response = await postRequest('auth/logout', {})
    console.log(response);
    return response
}

function Button() {
    const { pending } = useFormStatus()
    return (
        <button
                className="text-center text-nowrap min-w-fit text-red-500"
                type="submit"
            >
                {pending ? 'Logging out' : 'Logout'}
            </button>
    )
}

export default function LogoutButton() {
    const buttonStyle = 'hover:font-semibold'
    const router = useRouter()
    
    const dispatch = useAppDispatch()
    const handleLogout = async () => {
        console.log('Logout request')
        const response = await logoutRequest()
        await clearAuthCookies()
        
        dispatch(logout())
        router.push('/')
    }
    return (
        <form action={handleLogout} className={buttonStyle}>
            <Button />
    </form>
        
    )
}