'use client'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchUserData, logout } from '../authSlice'
import {
    googleToken,
    hasXsrfToken,
    removeGoogleToken
} from '@/@/service/api-handler/get-token'
import { googleSignin } from '@/@/api/google';
import { setAuthCookies } from '@/@/api/auth';

const AuthInitializer: React.FC = () => {

    const dispatch = useAppDispatch()
    const authState = useAppSelector((state) => state.auth)

    useEffect(() => {
        
        const checkAuth = async () => {
            try {
            
                const hasToken = await hasXsrfToken()

                if (!hasToken) {
                    const googleSigninToken = await googleToken()

                    if (googleSigninToken) {
                        const response = await googleSignin(googleSigninToken)
                        console.log('Google signin response:', response)
                    
                        if (response.statusCode === 200) {
                            dispatch(fetchUserData(''))
                            await setAuthCookies(response.result.userType, response.result.isEmailVerified)
                        }
                        await removeGoogleToken()
                    } else {
                        dispatch(logout())
                    }
                } else if (!authState.user) {
                    dispatch(fetchUserData(''))
                } 
            } catch (error) {
                console.error('Error in checkAuth:', error)
            }
        }
        checkAuth()
    }, [dispatch, authState.user]) // Add authState.user to dependency array

    return null
}

export default AuthInitializer
