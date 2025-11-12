'use client'

import { selectedCheckBox, unselectedCheckBox } from '../filter-components/icons'
import { useUrlParams } from '@/@/context/query-params'
const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

export enum JobModeEnum {
    REMOTE = 'remote',
    ON_SITE = 'on-site',
    HYBRID = 'hybrid'
}

export default function JobModeFilter() {
    // Use the more efficient useUrlParams hook instead
    const { toggleParam, getSelectedValues } = useUrlParams()
    
    const jobModes = [
        { name: 'Remote', slug: JobModeEnum.REMOTE },
        { name: 'On Site', slug: JobModeEnum.ON_SITE },
        { name: 'Hybrid', slug: JobModeEnum.HYBRID }
    ]
    
    // Get selected values as a Set for more efficient lookups
    const selectedJobModes = getSelectedValues('job-mode')
    
    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {jobModes.map((mode, index) => {
                const isSelected = selectedJobModes.has(mode.slug)
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => toggleParam('job-mode', mode.slug)}
                            >
                                <div className="w-[20px]">
                                    {isSelected ? selectedCheckBox : unselectedCheckBox}
                                </div>
                                <p className={labelStyle}>{mode.name}</p>
                            </label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
