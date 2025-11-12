'use client'
import { Tab, Tabs } from "@heroui/react"
import ProfileSavedPrograms from "../../../../components/dashboard/bookmarks/bookmarked-programs"
import ProfileSavedSupervisors from '../../../../components/dashboard/bookmarks/bookmarked-supervisors'
import { useLoadProfileData } from '@/@/hooks/useProfile'
import ProfileSavedJobs from "@/@/components/dashboard/bookmarks/bookmarked-jobs"

export default function BookmarksList() {
    useLoadProfileData()
    return (
        <div className="flex w-full flex-col">
            <Tabs variant="underlined">
                <Tab key="programs" title="Programs">
                    <ProfileSavedPrograms />
                </Tab>
                <Tab key="supervisor" title="Supervisor">
                    <ProfileSavedSupervisors />
                </Tab>
                <Tab key="jobs" title="Jobs">
                    <ProfileSavedJobs />
                </Tab>
            </Tabs>
        </div>
    )
}
