'use client'
import GenericSuggestionInput from '@/@/components/global/suggestion-input'

import { CountryT, StateT } from '@/@/lib/types/country-types'
import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

import { useProfileInformation } from '@/@/context/dashboard-context'
import { patchRequest } from '@/@/service/api-handler/patch-manager'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/@/app/store/hooks'
import { fetchUserData } from '@/@/app/store/authSlice'
import { useLoadProfileData } from '@/@/hooks/useProfile'
import Image from 'next/image'
import { CircleMinus, Minus } from 'lucide-react'

const inputStyle =
    'text-foreground text-sm border-2 border-[#EBEBEB] rounded-full p-4 focus:outline-none bg-white w-full'

function SubmitForm() {
    const { pending } = useFormStatus()
    return (
        <button
            className={`${
                pending
                    ? 'bg-[#00406B]'
                    : 'bg-gradient-to-r from-[#00406B] via-[#036694] to-[#007DD1]'
            } p-3 rounded-full text-light-text font-bold max-w-fit px-8 py-3 text-sm hover:bg-gradient-to-r hover:from-[#036694] hover:to-[#007DD1]`}
            disabled={pending}
            type="submit"
        >
            {pending ? 'Saving...' : 'Save Changes'}
        </button>
    )
}
const convertDownloadUrlToImageSrc = async (
    downloadUrl: string | null | undefined
) => {
    if (!downloadUrl) {
        console.log('No download URL provided')
        return null
    }
    try {
        // Add credentials and mode to handle potential CORS issues
        const response = await fetch(downloadUrl, {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Accept': 'image/*'
            }
        })
        
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
        }

        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)
        return objectUrl
    } catch (error) {
        console.error('Error converting download URL to image:', error)
        return null
    }
}

export function ChangePhoto() {
    const profile = useProfileInformation()
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        let objectUrl: string | null = null

        const fetchUrl = async () => {
            try {
                if (profile?.avatarPath) {
                    const imgUrl = await convertDownloadUrlToImageSrc(
                        profile.avatarPath
                    )
                    objectUrl = imgUrl
                    setSelectedPhoto(imgUrl)
                }
            } catch (error) {
                console.error('Error loading profile image:', error)
            }
        }

        fetchUrl()

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl)
            }
        }
    }, [profile?.avatarPath])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setSelectedPhoto(previewUrl)
            setSelectedFile(file)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!selectedFile) {
            alert('No file selected!')
            return
        }

        const formData = new FormData()
        formData.append('avatar', selectedFile) // Match the API parameter

        try {
            const response = await patchRequest('auth/update-profile', formData)

            if (response.statusCode === 200) {
                toast.success('Image uploaded successfully!')
            } else {
                toast.error('Failed to upload image.')
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Upload failed.')
        }
    }

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setSelectedFile(null)
        setSelectedPhoto(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
        >
            <label className="text-foreground font-semibold text-4xl rounded-full p-16 bg-[#F1F6F7]/40 flex items-center justify-center relative max-w-fit overflow-hidden">
                {selectedPhoto ? (
                    <Image
                        src={selectedPhoto}
                        alt="profile picture"
                        className="absolute z-10 inset-0 w-full h-full object-cover rounded-full"
                        width={20}
                        height={20}
                    />
                ) : (
                    <p className="absolute">
                        {`${profile?.firstName?.[0] || ''}${
                            profile?.lastName?.[0] || ''
                        }`}
                    </p>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    name="avatar"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </label>

            {selectedFile && (
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="mt-4 px-3 py-1 text-foreground hover:bg-button-primary hover:text-lightgray text-xs rounded-xl font-medium bg-button-light-primary"
                    >
                        Submit Photo
                    </button>
                    <button
                        onClick={handleRemove}
                        className="mt-4 px-3 py-1 text-lightgray text-xs rounded-xl font-medium bg-red-400 hover:bg-red-500"
                    >
                        Remove Photo
                    </button>
                </div>
            )}
        </form>
    )
}

export function RegisterHiddenInput({
    name,
    value
}: {
    name: string
    value: string | null
}) {
    const { register, setValue } = useFormContext()

    useEffect(() => {
        if (value) {
            setValue(name, value)
        }
    }, [name, value, setValue])

    if (!value) {
        return null
    } else {
        return <input type="hidden" {...register(name)} />
    }
}

export function CustomInput({
    dataKey,
    defaultValue,
    dataType
}: {
    dataKey: string
    defaultValue: string | undefined | null
    dataType: string
}) {
    const { register, setValue } = useFormContext()
    useEffect(() => {
        if (defaultValue) {
            setValue(dataKey, defaultValue)
        }
    }, [dataKey, defaultValue, setValue])
    return (
        <input {...register(dataKey)} type={dataType} className={inputStyle} />
    )
}

export default function PersonalInfoUpdateForm() {
    const profile = useProfileInformation()
    const dispatch = useAppDispatch()
    const labelStyle = 'text-foreground text-sm font-semibold'
    const { refreshPersonalInformation } = useLoadProfileData()
    const clientAction = async (data: any) => {
        const response = await patchRequest('auth/update-profile', data)
        if (response.statusCode === 200) {
            dispatch(fetchUserData(''))
            refreshPersonalInformation()
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
    }
    const [countryCode, setCountryCode] = useState<string | null>(null)
    const methods = useForm()
    const setIsoCode = ({ item }: { item: CountryT }) => {
        if (item) {
            try {
                setCountryCode(item.isoCode)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const setStateCode = ({ item }: { item: StateT }) => {
        if (item) {
            try {
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(clientAction)}
                className="grid grid-cols-3 gap-y-6"
            >
                <div className="xs:col-span-3 lg:col-span-2 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>First Name</label>
                        <CustomInput
                            dataKey={'firstName'}
                            defaultValue={profile?.firstName}
                            dataType="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>Last Name</label>
                        <CustomInput
                            dataKey="lastName"
                            defaultValue={profile?.lastName}
                            dataType="text"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label className={labelStyle}>
                            Country of Residence
                        </label>
                        <GenericSuggestionInput<CountryT>
                            apiPath="country"
                            placeholder="Select country"
                            dataKey="country"
                            defaultValue={
                                profile?.studentDetails?.countryName || ''
                            }
                            itemType={[]}
                            inputStyle={inputStyle}
                            onSelectItem={setIsoCode}
                        />
                        <RegisterHiddenInput
                            name={'countryCode'}
                            value={countryCode}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className={labelStyle}>State</label>
                        <GenericSuggestionInput<StateT>
                            apiPath={`state?countryCode=${countryCode}`}
                            placeholder="Select state"
                            defaultValue={
                                profile?.studentDetails?.stateName || ''
                            }
                            dataKey="state"
                            itemType={[]}
                            inputStyle={inputStyle}
                            onSelectItem={setStateCode}
                        />
                    </div>
                    <SubmitForm />
                </div>
            </form>
        </FormProvider>
    )
}
