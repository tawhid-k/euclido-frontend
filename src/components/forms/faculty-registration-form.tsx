import { Button } from '@heroui/button'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { getUniversityList } from '@/@/api/common'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ToastWithButton from '../global/toast-alert'
import { setAuthCookies } from '@/@/api/auth'
import { useAppDispatch } from '@/@/app/store/hooks'
import { setUser } from '@/@/app/store/authSlice'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

const registrationSchema = z.object({
    userType: z.enum(['Individual', 'Organization']),
    role: z.string().min(1, 'Please select your role'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    universityUuid: z.string().min(1, 'Institution name is required'),
    designation: z.enum(['Faculty', 'Recruiter']),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegistrationForm = z.infer<typeof registrationSchema>

interface RegistrationSubmission {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    authProvider: string;
    avatarPath: string;
    universityUuid: string;
    designation: string;
    recruiterType: string;
    isFacultyMember: boolean;
}

interface FacultyRegistrationFormProps {
    registerType: 'individual' | 'organization';
}


const FacultyRegistrationForm = ({ registerType }: FacultyRegistrationFormProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [universities, setUniversities] = useState<Array<{name: string, uuid: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<RegistrationForm>({
        userType: 'Individual',
        role: 'I am a faculty member',
        firstName: '',
        lastName: '',
        email: '',
        universityUuid: '',
        designation: 'Faculty',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const universitiesData = await getUniversityList();
                setUniversities(universitiesData);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };
        fetchUniversities();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const validatedData = registrationSchema.parse(formData)
            const submissionData: RegistrationSubmission = {
                email: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                password: validatedData.password,
                confirmPassword: validatedData.confirmPassword,
                authProvider: '',
                avatarPath: '',
                universityUuid: validatedData.universityUuid,
                designation: validatedData.designation,
                recruiterType: registerType,
                isFacultyMember: validatedData.designation === 'Faculty'
            }
            
            try {
                const response = await axios.post(`${base_url}/auth/registration/recruiter`, submissionData, {
                    withCredentials: true
                })
                if (response.status === 200 || response.status === 201) {
                    const result = response.data.result
                    
                    const user = {
                        uuid: result.uuid,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        userType: result.userType,
                        avatarPath: result.avatarPath
                    }
                    if (!result.isEmailVerified) {
                        localStorage.setItem('register-email', result.email)
                    }
                    await setAuthCookies(result.userType, result.isEmailVerified)
                    dispatch(setUser(user))
                    if (user.userType === 'student') {
                        router.push('/')
                    } else if (user.userType === 'recruiter') {
                        router.push('/jobs/dashboard')
                    }
                    if (!result.isEmailVerified) {
                        localStorage.setItem('register-email', result.email)
                    }
                    router.push('/auth/code-verification')
                } else {
                    console.log('Login failed')
                    toast.custom(
                        <ToastWithButton
                            title={response.data.message}
                            description="You already have an account. Please sign in."
                            linkPath="/auth/signin"
                            linkLabel="Reset Password"
                        />
                    )
                    setIsLoading(false);
                }
            } catch (error) {
                toast.custom(
                    <ToastWithButton
                        title="User already exist"
                        description="You already have an account. Please sign in."
                        linkPath="/auth/signin"
                        linkLabel="Signin"
                    />
                )
                console.log(error)
                setIsLoading(false);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formErrors: Record<string, string> = {}
                error.errors.forEach((err) => {
                    if (err.path) {
                        formErrors[err.path[0]] = err.message
                    }
                })
                setErrors(formErrors)
            }
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto p-6"
        >
            <div className="flex gap-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`"bg-white w-full rounded-full placeholder:text-center h-10 px-4 py-2" ${
                        errors.firstName ? 'border-red-500' : ''
                    }`}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`"bg-white w-full rounded-full placeholder:text-center h-10 px-4 py-2" ${
                        errors.lastName ? 'border-red-500' : ''
                    }`}
                />
            </div>
            {(errors.firstName || errors.lastName) && (
                <p className="text-red-500 text-sm mb-4">
                    {errors.firstName || errors.lastName}
                </p>
            )}

            <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`"bg-white w-full rounded-full placeholder:text-center h-10 px-4 py-2" ${
                    errors.email ? 'border-red-500' : ''
                }`}
            />
            {errors.email && (
                <p className="text-red-500 text-sm mb-4">{errors.email}</p>
            )}

            <select
                name="universityUuid"
                value={formData.universityUuid}
                onChange={handleChange}
                className={`bg-white w-full rounded-full placeholder:text-center text-foreground text-sm h-10 px-4 py-2 ${
                    errors.universityUuid ? 'border-red-500' : ''
                }`}
            >
                <option value="">Select Institution / University</option>
                {universities.map((university) => (
                    <option key={university.uuid} value={university.uuid}>
                        {university.name}
                    </option>
                ))}
            </select>
            {errors.universityUuid && (
                <p className="text-red-500 text-sm mb-4">
                    {errors.universityUuid}
                </p>
            )}

            <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={`bg-white w-full rounded-full placeholder:text-center text-foreground text-sm h-10 px-4 py-2 ${
                    errors.designation ? 'border-red-500' : ''
                }`}
            >
                <option value="Faculty">Faculty</option>
                <option value="Recruiter">Recruiter</option>
            </select>
            {errors.designation && (
                <p className="text-red-500 text-sm mb-4">
                    {errors.designation}
                </p>
            )}

            {/* Add password fields */}
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`bg-white w-full rounded-full placeholder:text-center h-10 px-4 py-2 ${
                    errors.password ? 'border-red-500' : ''
                }`}
            />
            {errors.password && (
                <p className="text-red-500 text-sm mb-4">{errors.password}</p>
            )}

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`bg-white w-full rounded-full placeholder:text-center h-10 px-4 py-2 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                }`}
            />
            {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>
            )}
           
            <Button
                type="submit"
                color="primary"
                radius="full"
                className="w-full font-medium"
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Continue'}
            </Button>

            <p className="text-xs text-center text-[#18467E]/60 mt-4">
                By signing up, you agree to the{' '}
                <a href="#" className="text-primary">
                    Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary">
                    Privacy Policy
                </a>{' '}
                of Euclido
            </p>
        </form>
    )
}

export default FacultyRegistrationForm
