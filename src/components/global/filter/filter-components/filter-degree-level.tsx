'use client'

import { selectedCheckBox, unselectedCheckBox } from './icons'
import { useFilterToggle } from '@/@/utils/filtering'
const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

export enum DegreeLevelEnum {
    BACHELOR = 'bachelor',
    MASTERS = 'masters',
    DOCTORATE = 'doctorate',
    POSTDOCTORATE = 'postdoctorate',
    CERTIFICATE = 'certificate',
    DIPLOMA = 'diploma',
    ASSOCIATE = 'associate',
    FOUNDATION = 'foundation',
    PREPARATORY = 'preparatory',
    GRADUATE_DIPLOMA = 'graduate_diploma'
}

export default function DegreeLevelFilter() {
    const { selectedValues, toggleValue } = useFilterToggle('degree-level')
    
    const degreeLevels = Object.entries(DegreeLevelEnum).map(([key, slug]) => ({
        name: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' '),
        slug
    }))

    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {degreeLevels.map((level, index) => {
                const isSelected = selectedValues.has(level.slug)
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => toggleValue(level.slug)}
                            >
                                <div className="w-[20px]">
                                    {isSelected ? selectedCheckBox : unselectedCheckBox}
                                </div>
                                <p className={labelStyle}>{level.name}</p>
                            </label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
