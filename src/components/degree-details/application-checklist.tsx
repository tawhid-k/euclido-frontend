import { appChecklistIcon, applicationCheckListCartoonSvg } from './icons'
import { gradientText } from '@/@/lib/styles'
const textColor = 'text-[#18467E]'

const applicationChecklist = [
    'Academic Transcript',
    'Statement of Purpose (SOP)',
    'English Language Test Reports',
    'Resume',
    'Letter of Recommendation',
    'Application Fees'
]

export default function ApplicationChecklist() {
    return (
        <div
            id="application-checklist"
            className="relative px-8 py-12 bg-gradient-to-br from-white to-[#E3F4FF]"
        >
            <div className="w-1/2">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Application Checklist
                    </h1>
                    <div
                        className={`pt-4 font-medium text-sm grid lg:grid-rows-4 lg:grid-flow-col gap-4 text-foreground`}
                    >
                        {applicationChecklist.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-center"
                            >
                                <div className="w-[20px]">
                                    {appChecklistIcon}
                                </div>
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="xs:hidden md:block z-20 absolute md:right-24 lg:right-32 bottom-0">
                {applicationCheckListCartoonSvg}
            </div>
        </div>
    )
}
