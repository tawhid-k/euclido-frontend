'use client'

import { selectedCheckBox, unselectedCheckBox } from './icons'
import { useFilterToggle } from '@/@/utils/filtering'
const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

export enum ProgramTypeEnum {
    COURSEWORK = 'coursework',
    THESIS = 'thesis',
    PROJECT = 'project'
}

export default function DegreeTypeFilter() {
    const { selectedValues, toggleValue } = useFilterToggle('program-type')
    
    const programTypes = [
        { name: 'Coursework', slug: ProgramTypeEnum.COURSEWORK },
        { name: 'Thesis', slug: ProgramTypeEnum.THESIS },
        { name: 'Project', slug: ProgramTypeEnum.PROJECT }
    ]
    
    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {programTypes.map((program, index) => {
                const isSelected = selectedValues.has(program.slug)
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => toggleValue(program.slug)}
                            >
                                <div className="w-[20px]">
                                    {isSelected ? selectedCheckBox : unselectedCheckBox}
                                </div>
                                <p className={labelStyle}>{program.name}</p>
                            </label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
