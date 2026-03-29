'use client'
import { useCallback, useEffect, useState } from 'react'
import { useProfileStore } from '@/@/context/dashboard-context'
import {
    mockProfile,
    mockBookmarkedPrograms,
    mockBookmarkedSupervisors,
    mockBookmarkedJobs
} from '@/@/lib/mock-data'

export function useLoadProfileData() {
    const {
        profileInformation,
        setProfileInformation,
        setSavedPrograms,
        setSavedSupervisors,
        setSavedJobs
    } = useProfileStore()

    const [isLoading, setIsLoading] = useState(false)

    const refreshPersonalInformation = useCallback(async () => {
        setProfileInformation(mockProfile)
    }, [setProfileInformation])

    const refreshBookmarkedSupervisors = useCallback(async () => {
        setSavedSupervisors(mockBookmarkedSupervisors as any)
    }, [setSavedSupervisors])

    const refreshBookmarkedPrograms = useCallback(async () => {
        setSavedPrograms(mockBookmarkedPrograms)
    }, [setSavedPrograms])

    const refreshBookmarkedJobs = useCallback(async () => {
        setSavedJobs(mockBookmarkedJobs)
    }, [setSavedJobs])

    useEffect(() => {
        if (profileInformation) return
        setIsLoading(true)
        setProfileInformation(mockProfile)
        setSavedPrograms(mockBookmarkedPrograms)
        setSavedSupervisors(mockBookmarkedSupervisors as any)
        setSavedJobs(mockBookmarkedJobs)
        setIsLoading(false)
    }, [profileInformation, setProfileInformation, setSavedPrograms, setSavedSupervisors, setSavedJobs])

    return {
        refreshPersonalInformation,
        refreshBookmarkedPrograms,
        refreshBookmarkedSupervisors,
        refreshBookmarkedJobs,
        isLoading
    }
}
