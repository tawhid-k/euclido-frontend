'use client'

import { selectedCheckBox, unselectedCheckBox } from './icons'
import { useFilterToggle } from '@/@/utils/filtering'
const labelStyle = 'font-normal text-[#18467E] xs:text-xs lg:text-sm'

export enum ProgramDeliveryModeEnum {
    ONLINE = 'online',
    ON_CAMPUS = 'on-campus',
    HYBRID = 'hybrid'
}

export default function DeliveryModeFilter() {
    const { selectedValues, toggleValue } = useFilterToggle('delivery-mode')
    
    const deliveryModeTypes = [
        { name: 'Online', slug: ProgramDeliveryModeEnum.ONLINE },
        { name: 'On Campus', slug: ProgramDeliveryModeEnum.ON_CAMPUS },
        { name: 'Hybrid', slug: ProgramDeliveryModeEnum.HYBRID }
    ]
    
    return (
        <div className="xs:pl-2 lg:pl-6 pt-0 pb-6 flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {deliveryModeTypes.map((mode, index) => {
                const isSelected = selectedValues.has(mode.slug)
                
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex justify-between">
                            <label 
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => toggleValue(mode.slug)}
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
