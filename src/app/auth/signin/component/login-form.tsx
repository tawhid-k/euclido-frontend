'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/@/app/store/hooks'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/button'
import { setUser } from '@/@/app/store/authSlice'
import { setAuthCookies } from '@/@/api/auth'
import { useState } from 'react'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    // Add loading state
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (_data: LoginFormData) => {
        setIsLoading(true)
        try {
            // Mock: auto sign in as Alex Johnson
            dispatch(setUser({ uuid: 'user-0001-0000-0000-000000000001', firstName: 'Alex', lastName: 'Johnson', email: 'alex@euclido.com', userType: 'student', avatarPath: '/prof.png' }))
            router.push('/')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="xs:w-full lg:w-80">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center gap-4"
            >
                <div className="w-full">
                    <input
                        {...register('email')}
                        className="bg-white w-full rounded-full placeholder:text-center h-10 px-4 py-2"
                        type="email"
                        placeholder="Your email address"
                    />
                    {errors.email && (
                        <p className="text-yellow-500 font-light text-xs mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    <input
                        {...register('password')}
                        className="bg-white w-full rounded-full placeholder:text-center px-4 py-2 h-10 focus:outline-blue-400"
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <p className="text-yellow-500 font-light text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    className="w-full font-medium"
                    isLoading={isLoading}
                >
                    {isLoading ? 'Signing in...' : 'Sign me in'}
                </Button>
            </form>
        </div>
    )
}
