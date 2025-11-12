'use client'

import { selectedCheckBox, unselectedCheckBox } from '../filter-components/icons'
import { useUrlParams } from '@/@/context/query-params'
const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

export enum JobTypeEnum {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time'
}

export default function JobTypeFilter() {
    // Use the more efficient useUrlParams hook
    const { toggleParam, getSelectedValues } = useUrlParams()
    
    const jobTypes = [
        { name: 'Full Time', slug: JobTypeEnum.FULL_TIME },
        { name: 'Part Time', slug: JobTypeEnum.PART_TIME }
    ]
    
    // Get selected values as a Set for more efficient lookups
    const selectedJobTypes = getSelectedValues('job-type')
    
    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {jobTypes.map((type, index) => {
                const isSelected = selectedJobTypes.has(type.slug)
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => toggleParam('job-type', type.slug)}
                            >
                                <div className="w-[20px]">
                                    {isSelected ? selectedCheckBox : unselectedCheckBox}
                                </div>
                                <p className={labelStyle}>{type.name}</p>
                            </label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
