// components/Logout.tsx
'use client'

import { useAppDispatch } from '../hooks'
import { logout } from '../authSlice'

const Logout: React.FC = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return <button onClick={handleLogout}>Logout</button>
}

export default Logout
