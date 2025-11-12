'use client'
import { ProgramT } from '@/@/lib/types/program-type'
import CustomTooltip from '../global/tooltip'
import { postRequest } from '@/@/service/api-handler/post-manager'
import { Bookmark, FileWarning, GitCompareArrows } from 'lucide-react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { BookmarkProgramDetailsT } from '@/@/lib/types/bookmarked-program-type'
import { addProgram } from '@/@/app/store/compareProgramsSlice'
import { RootState } from '@/@/app/store/store'
import { useAppDispatch, useAppSelector } from '@/@/app/store/hooks'
import { Alert } from '@heroui/react'
import useProgramListStore from '@/@/context/degree-list-context'
import {
    useProfileStore,
    useRemoveSavedProgram
} from '@/@/context/dashboard-context'
import Link from 'next/link'
import ToastWithButton from '../global/toast-alert'
import { getProgramDetails } from '@/@/api/program'
import { useState } from 'react'

export function BookmarkProgram({
    uuid,
    isBookmarked
}: {
    uuid: string
    isBookmarked: boolean
}) {
    const removeFromBookmark = useRemoveSavedProgram()
    const updateBookmark = useProgramListStore(
        (state) => state.updateProgramBookmark
    )
    const [localBookmarkState, setLocalBookmarkState] = useState(isBookmarked)

    const handleToggleBookmarkPrograms = async () => {
        // Optimistically update UI immediately
        const newBookmarkState = !localBookmarkState
        setLocalBookmarkState(newBookmarkState)
        updateBookmark(uuid, newBookmarkState)

        // If unbookmarking, remove from saved list immediately
        if (!newBookmarkState) {
            removeFromBookmark(uuid)
        }

        // Show immediate toast notification
        const toastId = toast.custom(
            <div key={'loading'} className="max-w-fit">
                <Alert
                    variant="faded"
                    color={'success'}
                    title={localBookmarkState ? 'Unsaving...' : 'Saving...'}
                    description="Updating your bookmarks..."
                />
            </div>
        )

        try {
            // Make the actual API request in the background
            const response = await postRequest('secure/bookmarks', {
                programUuid: uuid
            })

            // Handle the API response
            if (response.statusCode === 201) {
                // Update the toast with success message
                toast.dismiss(toastId)
                toast.custom(
                    <div key={'success'} className="max-w-fit">
                        <Alert
                            variant="faded"
                            color={'success'}
                            title={localBookmarkState ? 'Unsaved' : 'Saved'}
                            description={response.message}
                        />
                    </div>
                )
            } else if (response.statusCode === 401) {
                // Revert optimistic update
                setLocalBookmarkState(isBookmarked)
                updateBookmark(uuid, isBookmarked)

                // Show authentication required toast
                toast.dismiss(toastId)
                toast.custom(
                    <ToastWithButton
                        title="Sign In Required"
                        description="Unlock this feature by signing in and explore all the benefits we have to offer. ✨"
                        linkPath="/auth/signin"
                        linkLabel="Signin"
                    />
                )
            } else {
                // Revert optimistic update for any other error
                setLocalBookmarkState(isBookmarked)
                updateBookmark(uuid, isBookmarked)

                toast.dismiss(toastId)
                toast.custom(
                    <div key={'error'} className="max-w-fit">
                        <Alert
                            variant="faded"
                            color={'danger'}
                            title="Error"
                            description="Failed to update bookmark. Please try again."
                        />
                    </div>
                )
            }
        } catch (error) {
            // Revert optimistic update on network errors
            setLocalBookmarkState(isBookmarked)
            updateBookmark(uuid, isBookmarked)

            toast.dismiss(toastId)
            toast.custom(
                <div key={'error'} className="max-w-fit">
                    <Alert
                        variant="faded"
                        color={'danger'}
                        title="Error"
                        description="Network error. Please try again."
                    />
                </div>
            )
        }
    }

    return (
        <CustomTooltip
            Component={
                <button
                    type="button"
                    onClick={handleToggleBookmarkPrograms}
                    className="bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2"
                >
                    <Bookmark
                        size={22}
                        strokeWidth={1}
                        color="orange"
                        fill={localBookmarkState ? 'orange' : 'white'}
                    />
                </button>
            }
            tip="Bookmark program"
        />
    )
}

export function AddToCompare({
    program
}: {
    program: ProgramT | BookmarkProgramDetailsT
}) {
    const color = 'secondary'
    const dispatch = useAppDispatch()
    const selectedPrograms = useAppSelector(
        (RootState) => RootState.compare.selectedPrograms
    ).length
    const handleAddProgram = async () => {
        if (selectedPrograms < 5) {
            const programDetails = await getProgramDetails(program.uuid)
            if (programDetails) {
                dispatch(
                    addProgram({ uuid: program.uuid, program: programDetails })
                )
            } else {
                toast.error('There is an error')
            }
        } else {
            toast.custom(
                <div
                    key={color}
                    className="max-w-fit flex justify-center max-h-min items-center my-2"
                >
                    <Alert
                        color={color}
                        variant="faded"
                        title={`Maximum selected`}
                        description="No more than 5 programs can be compared at a time"
                        className="flex justify-center items-center"
                    />
                </div>
            )
        }
    }
    return (
        <CustomTooltip
            Component={
                <button onClick={handleAddProgram}>
                    <div className="bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2">
                        <GitCompareArrows
                            size={22}
                            strokeWidth={1}
                            className="text-button-primary"
                        />
                    </div>
                </button>
            }
            tip="Compare programs"
        />
    )
}

export function BookmarkSupervisor({
    uuid,
    isBookmarked
}: {
    uuid: string
    isBookmarked: boolean
}) {
    const updateSupervisorBookmark =
        useProgramListStore().updateSupervisorBookmark
    const removeSupervisorFromDashboard =
        useProfileStore().removeSavedSupervisor
    const [localBookmarkState, setLocalBookmarkState] = useState(isBookmarked)
    const handleToggleBookmarkSupervisors = async () => {
        // Optimistically update UI immediately
        const newBookmarkState = !localBookmarkState
        setLocalBookmarkState(newBookmarkState)
        updateSupervisorBookmark(uuid, newBookmarkState)

        // If unbookmarking, remove from dashboard immediately
        if (!newBookmarkState) {
            removeSupervisorFromDashboard(uuid)
        }

        // Show immediate toast notification
        const toastId = toast.custom(
            <div key={'loading'} className="max-w-fit">
                <Alert
                    variant="solid"
                    color={'success'}
                    title={localBookmarkState ? 'Unsaving...' : 'Saving...'}
                    description="Updating your bookmarks..."
                />
            </div>
        )

        try {
            // Make the actual API request in the background
            const response = await postRequest('secure/bookmarks', {
                supervisorUuid: uuid
            })

            // Handle the API response
            if (response.statusCode === 201) {
                // Update the toast with success message
                toast.dismiss(toastId)
                toast.custom(
                    <div key={'success'} className="max-w-fit">
                        <Alert
                            variant="solid"
                            color={'success'}
                            title={localBookmarkState ? 'Unsaved' : 'Saved'}
                            description={response.message}
                        />
                    </div>
                )
            } else if (response.statusCode === 401) {
                // Revert optimistic update
                setLocalBookmarkState(isBookmarked)
                updateSupervisorBookmark(uuid, isBookmarked)

                // Show authentication required toast
                toast.dismiss(toastId)
                toast.custom(
                    <div className="max-w-fit flex gap-4">
                        <Alert
                            title="Sign In Required"
                            key={'primary'}
                            color={'primary'}
                            variant="faded"
                            description="Unlock this feature by signing in and explore all the benefits we have to offer. ✨"
                            endContent={
                                <Link
                                    className="rounded-lg text-xs border-2 border-primary/40 bg-primary text-white px-2 py-1"
                                    href={'/auth/signin'}
                                >
                                    Signin
                                </Link>
                            }
                        />
                    </div>
                )
            } else {
                // Revert optimistic update for any other error
                setLocalBookmarkState(isBookmarked)
                updateSupervisorBookmark(uuid, isBookmarked)

                toast.dismiss(toastId)
                toast.custom(
                    <div key={'error'} className="max-w-fit">
                        <Alert
                            variant="solid"
                            color={'danger'}
                            title="Error"
                            description="Failed to update bookmark. Please try again."
                        />
                    </div>
                )
            }
        } catch (error) {
            // Revert optimistic update on network errors
            setLocalBookmarkState(isBookmarked)
            updateSupervisorBookmark(uuid, isBookmarked)

            toast.dismiss(toastId)
            toast.custom(
                <div key={'error'} className="max-w-fit">
                    <Alert
                        variant="solid"
                        color={'danger'}
                        title="Error"
                        description="Network error. Please try again."
                    />
                </div>
            )
        }
    }

    return (
        <CustomTooltip
            Component={
                <button
                    type="button"
                    onClick={handleToggleBookmarkSupervisors}
                    className="bg-[#F9F9F9] rounded-full p-2 border-[#F1F6F7] border-2"
                >
                    <Bookmark
                        size={22}
                        strokeWidth={1}
                        color="orange"
                        fill={localBookmarkState ? 'orange' : 'white'}
                    />
                </button>
            }
            tip="Bookmark supervisor"
        />
    )
}
