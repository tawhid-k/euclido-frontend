'use client'

import { useState } from 'react'
import { gradientText } from '@/@/lib/styles'
import { useProfileStore } from '@/@/context/dashboard-context'
import { useLoadProfileData } from '@/@/hooks/useProfile'

const calculateRemainingDays = (timestamp?: string) => {
    if (!timestamp) return 0

    const deadlineDate = new Date(parseInt(timestamp))
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
}

export default function UpcomingDeadlines() {
    // As it is a client component
    useLoadProfileData()
    const [selected, setSelected] = useState(0)
    const profileContext = useProfileStore()
    const btnStyle = (index: number) =>
        `rounded-full px-3 py-2 text-sm ${
            selected === index
                ? 'border-0 bg-[#E2F5FF] font-semibold text-button-primary'
                : 'border-[#E2F5FF] border-2 text-foreground font-medium'
        }`
    return (
        <div className="rounded-lg flex flex-col gap-0 bg-white">
            <div className="p-6 bg-[#F4FBFF] flex justify-between items-center rounded-t-lg">
                {/* First Layer */}
                <div className="flex flex-col gap-1">
                    <h2 className={`${gradientText} text-xl font-bold`}>
                        Upcoming Deadlines
                    </h2>
                    <h3 className={`${gradientText} font-normal text-sm`}>
                        Based on your saved programs
                    </h3>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSelected(0)}
                        className={btnStyle(0)}
                    >
                        Next 6 Months
                    </button>
                    <button
                        onClick={() => setSelected(1)}
                        className={btnStyle(1)}
                    >
                        This Year
                    </button>
                    <button
                        onClick={() => setSelected(2)}
                        className={btnStyle(2)}
                    >
                        Next Year
                    </button>
                </div>
            </div>
            <div>
                {/* Second Layer */}
                <div className="border-b-2 border-[#F0F0F0] border-x-2 p-2 grid grid-cols-3 align-start">
                    <h3 className="col-span-1 py-1 px-2 font-semibold text-foreground">
                        Program
                    </h3>
                    <h3 className="col-span-1 py-1 px-2 font-semibold text-foreground">
                        University
                    </h3>
                    <h3 className="col-span-1 py-1 px-2 font-semibold text-foreground">
                        Application Deadline
                    </h3>
                </div>
            </div>
            {profileContext?.savedPrograms?.map((items, index) => (
                <div
                    key={index}
                    className="border-b-2 border-[#F0F0F0] border-x-2 p-2 grid grid-cols-3 align-start"
                >
                    {/* Third Layer */}
                    <h3 className="col-span-1 text-base py-1 px-2 font-normal text-foreground">
                        {`${items.program.name} (${items.program.degreeLevel}/${
                            items.program.types ? 'Full time' : 'Part time'
                        })`}
                    </h3>
                    <h3 className="col-span-1 text-base py-1 px-2 font-normal text-foreground">
                        {`${items.program.university.name}`}
                    </h3>
                    <div className="flex flex-col gap-0">
                        {/* FIXME: Find the issue with application deadline */}
                        <h3 className="col-span-1 text-base py-1 px-2 font-normal text-foreground">
                            {items?.program.applicationDeadlines?.length !== 0
                                ? new Date(
                                      Number(
                                          items.program.applicationDeadlines[0]
                                              ?.deadlineTimestamp
                                      )
                                  ).toDateString()
                                : 'N/A'}
                        </h3>
                        {/* FIXME: Remaining Days */}
                        <h4 className="col-span-1 text-sm px-2 font-normal text-[#00406B]/60">
                            {`${calculateRemainingDays(
                                items.program.applicationDeadlines[0]
                                    ?.deadlineTimestamp
                            )} days remaining`}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    )
}
