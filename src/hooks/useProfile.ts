'use client'
import { useCallback, useEffect, useState } from 'react'
import {
    useProfileInformation,
    useProfileStore,
} from '@/@/context/dashboard-context'
import { fetchBookmarkedJobs, fetchBookmarkedPrograms, fetchBookmarkedSupervisors, fetchPersonalData } from '@/@/api/profile'

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
    try {
      const profile = await fetchPersonalData()
      setProfileInformation(profile)
    } catch (error) {
      console.error('Error refreshing profile:', error)
    }
  }, [setProfileInformation])
  const refreshBookmarkedSupervisors = useCallback(async () => {
    try {
      const supervisors = await fetchBookmarkedSupervisors()
      setSavedSupervisors(supervisors)
    } catch (error) {
      console.error('Error refreshing supervisors:', error)
    }
  }, [setSavedSupervisors])
  const refreshBookmarkedPrograms = useCallback(async () => {
    try {
      const programs = await fetchBookmarkedPrograms()
      setSavedPrograms(programs)
    } catch (error) {
      console.error('Error refreshing programs:', error)
    }
  }, [setSavedPrograms])

  const refreshBookmarkedJobs = useCallback(async () => {
    try {
      const jobs = await fetchBookmarkedJobs()
      setSavedJobs(jobs)
    } catch (error) {
      console.error('Error refreshing jobs:', error)
    }
  }, [setSavedJobs])

  const loadAllData = useCallback(async () => {
    if (profileInformation) return

    setIsLoading(true)
    try {
      const [profileData, programs, supervisors, jobs] = await Promise.all([
        fetchPersonalData(),
        fetchBookmarkedPrograms(),
        fetchBookmarkedSupervisors(),
        fetchBookmarkedJobs(),
      ])

      setProfileInformation(profileData)
      setSavedPrograms(programs)
      setSavedSupervisors(supervisors)
      setSavedJobs(jobs)
      
    } catch (error) {
      console.error('Error loading profile data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [profileInformation, setProfileInformation, setSavedPrograms, setSavedSupervisors, setSavedJobs])

  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  return {
    refreshPersonalInformation, 
    refreshBookmarkedPrograms, 
    refreshBookmarkedSupervisors,
    refreshBookmarkedJobs,
    isLoading
  }
}

