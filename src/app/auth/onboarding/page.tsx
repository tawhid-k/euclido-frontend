'use client'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { tailwindStyle } from './components/questions/styles'
import Country from './components/questions/country'
import ChoiceOfDiscipline from './components/questions/discipline'
import Specialization from './components/questions/specialization'
import ResearchInterest from './components/questions/research-interest'
import toast from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

function OnBoardingForm({
    step,
    setStep
}: {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
}) {
    const router = useRouter()
    const methods = useForm({})
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: any) => {
        const formattedData = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            confirmPassword: data.confirmPassword,
            authProvider: '',
            avatarPath: '',
            countryCode: data.countryCode,
            stateCode: data.stateCode,
            disciplineUuids: Array.isArray(data.disciplineUuid)
                ? data.disciplineUuid
                : data.disciplineUuid
                ? [data.disciplineUuid]
                : [],
            areaOfInterestUuids: Array.isArray(data.subDisciplineUuid)
                ? data.subDisciplineUuid
                : data.subDisciplineUuid
                ? [data.subDisciplineUuid]
                : [],
            researchInterestUuids: Array.isArray(data.researchInterestUuid)
                ? data.researchInterestUuid
                : data.researchInterestUuid
                ? [data.researchInterestUuid]
                : []
        }

        try {
            setLoading(true)
            const response = await axios.post(
                `${base_url}/auth/registration`,
                formattedData,
                {
                    withCredentials: true
                }
            )
            // console.log(response)
            if (response.status === 201) {
                toast.success(response.data.message)
                localStorage.setItem(
                    'register-email',
                    response.data.result.email
                )
                router.push('/auth/code-verification')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const nextStyle =
        'xs:px-8 xs:py-3 lg:px-12 lg:py-3 bg-button-primary xs:text-sm lg:text-base font-bold rounded-full text-light-text max-w-fit'
    const skipStyle =
        'xs:px-8 xs:py-3 lg:px-12 lg:py-3 bg-button-light-primary xs:text-sm lg:text-base font-bold rounded-full text-button-primary max-w-fit'
    return (
        <div className="py-12 px-8 h-full">
            <FormProvider {...methods}>
                <form
                    className="flex flex-col justify-between h-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div>
                        {step === 0 && <Names />}
                        {step === 1 && <Country />}
                        {step === 2 && <ChoiceOfDiscipline />}
                        {step === 3 && <Specialization />}
                        {step === 4 && <ResearchInterest />}
                        {step === 5 && <Passwords />}
                    </div>
                    <div className="flex justify-end">
                        {step === 0 && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setStep(step + 1)
                                }}
                                className={nextStyle}
                            >
                                Next
                            </button>
                        )}
                        {step > 0 && step < 5 && (
                            <div className="flex justify-between w-full">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setStep(step + 1)
                                    }}
                                    className={skipStyle}
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setStep(step + 1)
                                    }}
                                    className={nextStyle}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 5 && (
                            <input
                                type="submit"
                                value={loading ? 'Processing...' : 'Done'}
                                disabled={loading}
                                className={`px-12 py-3 cursor-pointer ${
                                    loading
                                        ? 'bg-button-primary'
                                        : 'bg-button-primary'
                                } text-base font-bold rounded-full text-light-text max-w-fit`}
                            />
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default function OnBoarding() {
    const [step, setStep] = useState(0)
    return (
        <div className="z-30 fixed min-h-screen w-full flex flex-col items-center pt-12">
            <div className="flex flex-col gap-4">
                <div className="w-10 h-10">
                    {step !== 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full"
                        >
                            <svg
                                width="8"
                                height="14"
                                viewBox="0 0 8 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.56694 13.6919C7.32287 13.936 6.92714 13.936 6.68306 13.6919L0.433085 7.44192C0.189002 7.19783 0.189002 6.80217 0.433085 6.55808L6.68306 0.308056C6.92714 0.0639812 7.32287 0.0639812 7.56694 0.308056C7.81102 0.552131 7.81102 0.947865 7.56694 1.19194L1.75892 7L7.56694 12.8081C7.81102 13.0522 7.81102 13.4478 7.56694 13.6919Z"
                                    fill="#00406B"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <div
                    className={`relative xs:w-full lg:w-[900px] ${
                        step !== 4 ? 'h-[460px]' : 'min-h-[460px]'
                    } bg-white bg-opacity-50 rounded-b-[50px]`}
                >
                    <div
                        className={`absolute ${
                            step === 0
                                ? 'w-1/6'
                                : step === 1
                                ? 'w-2/6'
                                : step === 2
                                ? 'w-1/2'
                                : step === 3
                                ? 'w-4/6'
                                : step === 4
                                ? 'w-5/6'
                                : 'w-full'
                        } h-2 bg-light-sea-green transition-all duration-300`}
                    ></div>
                    <OnBoardingForm step={step} setStep={setStep} />
                </div>
            </div>
        </div>
    )
}


function Names() {
    const { register } = useFormContext()
    return (
        <div className={tailwindStyle.topDivStyle}>
            <label className={tailwindStyle.labelStyle}>Your Name</label>
            <div className={tailwindStyle.divStyle}>
                <input
                    className={tailwindStyle.inputStyle}
                    placeholder="First Name"
                    type="text"
                    required
                    {...register('firstName')}
                />
                <input
                    className={tailwindStyle.inputStyle}
                    placeholder="Last Name"
                    type="text"
                    required
                    {...register('lastName')}
                />
            </div>
        </div>
    )
}

function Passwords() {
    const { register, setValue } = useFormContext()
    useEffect(() => {
        const email = localStorage.getItem('register-email')
        setValue('email', email)
    })
    return (
        <div className={tailwindStyle.topDivStyle}>
            <label className={tailwindStyle.labelStyle}>Set a Password</label>
            <div className={tailwindStyle.divStyle}>
                <input type="hidden" {...register('email')} />
                <input
                    className={tailwindStyle.inputStyle}
                    placeholder="Password"
                    type="password"
                    {...register('password')}
                    required
                    minLength={6}
                />
                <input
                    className={tailwindStyle.inputStyle}
                    placeholder="Confirm Password"
                    type="password"
                    {...register('confirmPassword')}
                    required
                    minLength={6}
                />
            </div>
        </div>
    )
}
