'use client';

import { useProfileStore } from "@/@/context/dashboard-context";
import { JobCardType } from "@/@/lib/types/jobs/job-list";
import { useState } from "react";
import { toggleJobBookmark } from '@/@/api/jobs/student-jobs'
import { Bookmark } from 'lucide-react'

export default function JobBookmarkButton({job} : {job:JobCardType}) {
    const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false)
    const removeSavedJob = useProfileStore((state) => state.removeSavedJob)
    return(
        <button   
            onClick={async() => {
                setIsBookmarked(!isBookmarked)
                // TODO: Fix the bookmark remove
                removeSavedJob(job.uuid)
                const result = await toggleJobBookmark(job.uuid, job.isBookmarked || false)
                if (!result.success) {
                    setIsBookmarked(!isBookmarked)
                }
            }}
        >
        <Bookmark
            size={22}
            strokeWidth={1}
            color="orange"
            fill={isBookmarked ? 'orange' : 'white'}
        />
        </button>
    )
}