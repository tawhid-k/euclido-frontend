'use client'
import PersonalInfoUpdateForm, {
    ChangePhoto
} from '../../../../components/forms/profile-forms/personalInformation/personal-info'
import ChangePasswordUpdateForm from '../../../../components/forms/profile-forms/password-update/change-pass'
import AcademicInterestsUpdateForm from '../../../../components/forms/profile-forms/academicInterest/academic-interests'
import { gradientText } from '@/@/lib/styles'
import { useProfileInformation } from '@/@/context/dashboard-context'
import {
    BookOpenText,
    Lock,
    Mail,
    MapPinHouse,
    SeparatorVertical,
    UserRoundPen
} from 'lucide-react'
import { Tab, Tabs } from '@heroui/react'
import { useLoadProfileData } from '@/@/hooks/useProfile'
import { DashboardTopLayerSkeleton } from '@/@/components/global/skeleton'

function PersonalInformation() {
    return (
        <div className="col-span-3 grid grid-cols-4 gap-x-2 xs:gap-y-4 lg:gap-y-0 px-2 py-4">
            <div className="xs:col-span-4 lg:col-span-1 flex flex-col gap-2">
                <h3 className={`${gradientText} text-lg font-bold`}>
                    Personal Information
                </h3>
                <p className={`${gradientText} text-xs`}>
                    Update your personal details to make sure your profile is
                    up-to-date
                </p>
            </div>
            <div className="xs:col-span-4 lg:col-span-3 xs:px-2 lg:px-12">
                <PersonalInfoUpdateForm />
            </div>
        </div>
    )
}

function AcademicInterests() {
    return (
        <div className="col-span-3 grid grid-cols-4 gap-x-2 gap-y-4 px-2 py-4">
            <div className="xs:col-span-4 lg:col-span-1 flex flex-col gap-2">
                <h3 className={`${gradientText} text-lg font-bold`}>
                    Academic Interests
                </h3>
                <p className={`${gradientText} text-xs`}>
                    Update your areas of interest and research interests to
                    match better programs and supervisors
                </p>
            </div>
            <div className="xs:col-span-4 lg:col-span-3 xs:px-2 lg:px-12">
                <AcademicInterestsUpdateForm />
            </div>
        </div>
    )
}

function ChangePassword() {
    return (
        <div className="col-span-3 grid grid-cols-4 gap-y-4 gap-x-2 px-2 py-4">
            <div className="xs:col-span-4 lg:col-span-1 flex flex-col gap-2">
                <h3 className={`${gradientText} text-lg font-bold`}>
                    Change Password
                </h3>
                <p className={`${gradientText} text-xs`}>
                    Keep your password strong and updated to be safe from
                    possible data breach
                </p>
            </div>
            <div className="xs:col-span-4 lg:col-span-2 xs:px-2 lg:px-12">
                <ChangePasswordUpdateForm />
            </div>
        </div>
    )
}

export default function ProfileUpdate() {
    useLoadProfileData()
    const seperator = (
        <div className="col-span-3 w-3/4 justify-self-end  h-[1px] bg-[#F0F0F0]"></div>
    )
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8">
            <TopLayer />
            <Tabs
                aria-label="Tabs form"
                size="md"
                classNames={{
                    tabList: 'gap-0 bg-white w-full relative rounded-full',
                    cursor: 'w-full',
                    tab: 'max-w-fit p-0',
                    tabContent:
                        'group-data-[selected=true]:text-primary text-foreground'
                }}
            >
                <Tab
                    key="personal"
                    title={
                        <div className="flex items-center gap-4 bg-white px-8 py-2">
                            <UserRoundPen strokeWidth={1} />
                            <span>Personal Information</span>
                        </div>
                    }
                >
                    <PersonalInformation />
                </Tab>
                <Tab
                    key="academic"
                    title={
                        <div className="flex items-center gap-4 bg-white px-8 py-2">
                            <BookOpenText strokeWidth={1} />
                            <span>Academic Interests</span>
                        </div>
                    }
                >
                    <AcademicInterests />
                </Tab>
                <Tab
                    key="password"
                    title={
                        <div className="flex items-center gap-4 bg-white px-8 py-2">
                            <Lock strokeWidth={1} />
                            <span>Change Password</span>
                        </div>
                    }
                >
                    <ChangePassword />
                </Tab>
            </Tabs>
        </div>
    )
}

function TopLayer() {
    const profile = useProfileInformation()

    const areaOfInterestLength = profile?.areaOfInterests.length || 0
    const researchInterestLength = profile?.researchInterests.length || 0
    if (!profile) {
        return <DashboardTopLayerSkeleton />
    } else
        return (
            <div className="w-full items-center justify-center flex flex-col gap-4">
                <ChangePhoto />
                <div className="flex flex-col justify-center items-center gap-2 text-foreground">
                    <h3 className="text-foreground font-semibold text-2xl">{`${
                        profile?.firstName || ''
                    } ${profile?.lastName || ''}`}</h3>
                    <div className="flex xs:flex-col lg:flex-row items-center xs:gap-2 lg:gap-8">
                        <div className="flex gap-2 items-center">
                            <Mail strokeWidth={1} size={22} />
                            <span>{profile?.email || ''}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MapPinHouse strokeWidth={1} size={22} />
                            <span>{`${
                                profile?.studentDetails?.stateName
                                    ? `${
                                          profile?.studentDetails.stateName ||
                                          ''
                                      },`
                                    : ''
                            } ${
                                profile?.studentDetails?.countryName || ''
                            }`}</span>
                        </div>
                    </div>
                </div>
                <div className="pt-2 flex flex-col items-center gap-2 text-foreground w-full">
                    {/* area */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {profile?.areaOfInterests.map(
                            (areaOfInterest, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 font-medium"
                                >
                                    <span>
                                        {areaOfInterest.areaOfInterest.name}
                                    </span>
                                    {index !== areaOfInterestLength - 1 && (
                                        <span>
                                            <SeparatorVertical
                                                strokeWidth={1}
                                                size={22}
                                            />
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                    {/* research */}
                    <div className="flex flex-wrap gap-2 items-center justify-center ">
                        {profile?.researchInterests.map(
                            (researchInterest, index) => (
                                <div
                                    key={index}
                                    className=" max-w-fit flex items-center justify-center gap-2 w-full"
                                >
                                    <span className="max-w-fit">
                                        {researchInterest.researchInterest.name}
                                    </span>
                                    {index !== researchInterestLength - 1 && (
                                        <span>
                                            <SeparatorVertical
                                                strokeWidth={1}
                                                size={22}
                                            />
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        )
}
