'use client'

import { selectedCheckBox, unselectedCheckBox } from './icons'
import { useUrlParams } from '@/@/context/query-params'
const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

export enum AcademicQualificationEnum {
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

export default function MinimumQualificationFilter() {
    // Use the more efficient useUrlParams hook
    const { toggleParam, getSelectedValues } = useUrlParams()
    
    const qualificationTypes = [
        { name: 'Bachelor\'s', slug: AcademicQualificationEnum.BACHELOR },
        { name: 'Master\'s', slug: AcademicQualificationEnum.MASTERS },
        { name: 'Doctorate', slug: AcademicQualificationEnum.DOCTORATE },
        { name: 'Post Doctorate', slug: AcademicQualificationEnum.POSTDOCTORATE },
        { name: 'Certificate', slug: AcademicQualificationEnum.CERTIFICATE },
        { name: 'Diploma', slug: AcademicQualificationEnum.DIPLOMA },
        { name: 'Associate', slug: AcademicQualificationEnum.ASSOCIATE },
        { name: 'Foundation', slug: AcademicQualificationEnum.FOUNDATION },
        { name: 'Preparatory', slug: AcademicQualificationEnum.PREPARATORY },
        { name: 'Graduate Diploma', slug: AcademicQualificationEnum.GRADUATE_DIPLOMA }
    ]
    
    // Get selected values as a Set for more efficient lookups
    const selectedQualifications = getSelectedValues('minimum-qualifications')
    
    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {qualificationTypes.map((qualification, index) => {
                const isSelected = selectedQualifications.has(qualification.slug)
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => toggleParam('minimum-qualifications', qualification.slug)}
                            >
                                <div className="w-[20px]">
                                    {isSelected ? selectedCheckBox : unselectedCheckBox}
                                </div>
                                <p className={labelStyle}>{qualification.name}</p>
                            </label>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
