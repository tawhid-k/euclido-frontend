'use client'
import { patchRequest } from '@/@/service/api-handler/patch-manager'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

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
            {pending ? 'Updating' : 'Update Password'}
        </button>
    )
}

export default function ChangePasswordUpdateForm() {
    const labelStyle = 'text-foreground text-sm font-semibold'
    const inputStyle =
        'text-foreground text-sm border-2 border-[#EBEBEB] rounded-full p-4 focus:outline-none bg-white'

    const clientAction = async (formData: FormData) => {
        const payload = {
            currentPassword: formData.get('currentPassword'),
            newPassword: formData.get('newPassword'),
            confirmPassword: formData.get('confirmPassword')
        }

        const response = await patchRequest('auth/update-password', payload)
        // console.log(response)
        if (response.statusCode === 200) {
            toast.success(response.message)
        } else {
            toast.error(response.message)
        }
    }

    return (
        <form action={clientAction} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className={labelStyle}>Current Password</label>
                <input
                    name="currentPassword"
                    type="password"
                    className={inputStyle}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className={labelStyle}>New Password</label>
                <input
                    name="newPassword"
                    type="password"
                    className={inputStyle}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className={labelStyle}>Confirm New Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    className={inputStyle}
                />
            </div>
            <SubmitForm />
        </form>
    )
}
