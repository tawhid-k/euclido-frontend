'use client'
import Image from 'next/image'
import { bookmark, citation, googleScholar, webUrl } from './icons'
import { Bookmark, Search, SeparatorVerticalIcon } from 'lucide-react'
import useSWR from 'swr'
import { getRequest } from '@/@/service/api-handler/get-manager'
import LoadingSpinner from '@/@/components/global/skeleton'
import { SupervisorT } from '@/@/lib/types/supervisor-type'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { postRequest } from '@/@/service/api-handler/post-manager'
import toast from 'react-hot-toast'
import { crossItem } from '../dashboard/svgItems'
import CustomTooltip from '../global/tooltip'
import { ResearchInterestT } from '@/@/lib/types/user-profile-type'
import { debounce } from 'lodash'
import { Spinner, Tooltip } from '@heroui/react'
import UniversityLogo from '../global/university-image'
import { BookmarkSupervisor } from './actions'
import { fetchWithAuthToken } from '@/@/service/api-handler/program-data/get-program-data'
import dynamic from 'next/dynamic'
import { BookmarkedSupervisorT } from '@/@/lib/types/bookmarked-supervisor-type'
import useProgramListStore from '@/@/context/degree-list-context'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type DType = {
    id: number
    uuid: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    programId: number
    type: string
}

type Commitment = {
    programId: number
    commitment: string
    id: number
    uuid: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export type BasicProgramInfo = {
    uniLogo: string
    name: string
    school: string
    degreeLevel: string
    programUuid: string
    degreeType: DType[]
    degreeCommitment: Commitment[]
}

type ProfessorType = {
    name: string
    designation: string
    degrees: string
    citation: number
    hIndex: number
    i10Index: number
    webUrl?: string
    googleScholarUrl?: string
    contact?: string
    researchInterests: string[]
}

export const handleToggleBookmarkSupervisor = async (uuid: string) => {
    const response = await postRequest('secure/bookmarks', {
        supervisorUuid: uuid
    })
    if (response.statusCode === 201) {
        toast.success(response.message)
    } else {
        toast.error(response.message)
    }
}

function SearchBar({
    supervisors,
    onFilteredResults
}: {
    supervisors: SupervisorT[]
    onFilteredResults: (filtered: SupervisorT[]) => void
}) {
    const [searchTerm, setSearchTerm] = useState('')

    const searchSupervisors = useMemo(() => {
        return (value: string, data: any[]) => {
            const searchValue = value.toLowerCase()
            return data.filter(
                (supervisor) =>
                    supervisor.supervisor.name
                        .toLowerCase()
                        .includes(searchValue) ||
                    supervisor.supervisor.researchInterests.some(
                        (interest: ResearchInterestT) =>
                            interest.researchInterest.name
                                .toLowerCase()
                                .includes(searchValue)
                    )
            )
        }
    }, [])
    const debouncedSearch = useCallback(
        debounce((value: string) => {
            const filtered = searchSupervisors(value, supervisors)
            onFilteredResults(filtered)
        }, 300),
        []
    )
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchTerm(value)
        debouncedSearch(value)
    }
    return (
        <div className="flex items-center gap-1 bg-white rounded-full p-2 justify-center w-2/3">
            <Search className="text-gray-600" />
            <input
                placeholder="Search professors"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="xs:text-sm lg:text-base w-full xs:placeholder:text-xs md:placeholder:text-sm rounded-full xs:px-2  focus:outline-none"
            />
        </div>
    )
}
export function SupervisorCard({
    prof,
    fromDashboard = false
}: {
    prof: SupervisorT | BookmarkedSupervisorT
    fromDashboard?: boolean
}) {
    const divider = <div className="h-4 w-0.5 bg-african-violet"></div>

    const allResearchInterets = prof.supervisor.researchInterests.map(
        (researchInterest) => researchInterest.researchInterest.name
    )
    // TODO: Don't check uniqueness from client side if it has been fixed from backend
    const uniqueResearchInterest = Array.from(new Set(allResearchInterets))
    return (
        <div className="grid grid-cols-4 bg-white border border-[#f0f0f0] p-4 rounded-lg gap-4 h-full">
            <div className="xs:col-span-4 md:col-span-4 flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                    <Image
                        className="rounded-full p-1 border border-lightblue"
                        src={prof.supervisor.avatarPath || '/common.png'}
                        width={60}
                        height={60}
                        loading="lazy"
                        style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain'
                        }}
                        alt={prof.supervisor.name}
                    />
                    <div className="flex flex-col gap-0">
                        <h3 className="xs:text-sm lg:text-base font-semibold text-foreground">
                            {prof.supervisor.name}
                        </h3>
                        <h3 className="xs:text-xs lg:text-sm text-foreground/70">
                            {prof.supervisor.designation}
                        </h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 break-words overflow-wrap">
                    {uniqueResearchInterest.map((rI, index) => (
                        <div
                            className="flex items-center gap-2 break-words overflow-wrap"
                            key={index}
                        >
                            <p
                                className="xs:text-xs lg:text-sm text-foreground break-words overflow-wrap"
                                key={index}
                            >
                                {rI}
                            </p>
                            {index <
                                prof.supervisor.researchInterests.length -
                                    1 && (
                                <SeparatorVerticalIcon
                                    strokeWidth={1.5}
                                    className="text-lightblue"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <button className="xs:block lg:hidden max-w-fit text-button-primary text-xs font-medium py-2 px-3 bg-button-light-primary rounded-full">
                    Send Email
                </button>
                <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                        <BookmarkSupervisor
                            uuid={prof.supervisor.uuid}
                            isBookmarked={fromDashboard || prof.isBookmarked}
                        />
                        <Tooltip
                            showArrow
                            classNames={{
                                base: [
                                    'bg-white rounded-lg border-[F0F0F0]/40'
                                ],
                                content: [
                                    'py-2 px-4 bg-white rounded-lg',
                                    'text-primary font-medium text-sm bg-white'
                                ]
                            }}
                            content={
                                <div className="flex gap-4 items-center">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-foreground font-medium text-sm">
                                            Citation
                                        </label>
                                        <p className="text-button-primary font-semibold text-sm">
                                            {prof.supervisor.citation}
                                        </p>
                                    </div>
                                    <SeparatorVerticalIcon
                                        strokeWidth={1.5}
                                        className="text-lightblue"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label className="text-foreground font-medium text-sm">
                                            H-Index
                                        </label>
                                        <p className="text-button-primary font-semibold text-sm">
                                            {prof.supervisor.hIndex}
                                        </p>
                                    </div>
                                </div>
                            }
                            placement="top"
                        >
                            {citation}
                        </Tooltip>

                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={prof.supervisor.googleScholarUrl}
                        >
                            <CustomTooltip
                                Component={googleScholar}
                                tip="Google scholar link"
                            />
                        </a>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={prof.supervisor.personalWebUrl}
                        >
                            <CustomTooltip
                                Component={webUrl}
                                tip="Website link"
                            />
                        </a>
                    </div>
                    <div className="flex gap-4 items-center">
                        <a
                            href={`mailto:${prof.supervisor.contact}`}
                            className="xs:hidden lg:block text-button-primary text-sm font-medium py-2 px-4 bg-button-light-primary rounded-full"
                        >
                            Send Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Modal(props: { program: BasicProgramInfo }) {
    const [filteredSupervisors, setFilteredSupervisors] = useState<
        SupervisorT[]
    >([])
    const programListContext = useProgramListStore()
    const fetcher = async (url: string) => {
        const response = await getRequest(url, true)
        if (response.statusCode === 200) {
            return response.result
        } else {
            return null
        }
    }

    const { data, error, isLoading } = useSWR(
        `program/${props.program.programUuid}/supervisors`,
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        }
    )
    useEffect(() => {
        programListContext.setSupervisors(data)
    }, [data])
    const handleFilteredResults = (filtered: SupervisorT[]) => {
        setFilteredSupervisors(filtered)
    }
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Spinner label="Loading supervisor info..." />
            </div>
        )
    } else if (!isLoading && data) {
        const filteredSupervisorsLength = filteredSupervisors.length
        const supervisorsToRender =
            filteredSupervisorsLength > 0 ? filteredSupervisors : data

        return (
            <div>
                <div
                    style={{
                        backgroundImage:
                            'url(/assets/supervisor-modal-top-center.svg)',
                        backgroundPosition: 'top right',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
                    className="flex flex-col gap-4 xs:items-start lg:items-start justify-center w-full xs:px-2 xs:py-4 lg:p-8"
                >
                    <div className="flex items-center gap-4">
                        <UniversityLogo
                            path={props.program.uniLogo}
                            name="University Logo"
                            size={60}
                        />
                        <div className="flex flex-col gap-1">
                            <p className="font-medium">{props.program.name}</p>
                            <p className="text-sm">{props.program.school}</p>
                        </div>
                    </div>
                    <SearchBar
                        supervisors={data}
                        onFilteredResults={handleFilteredResults}
                    />
                </div>
                <p className="text-foreground text-sm px-8 py-4">{`Total ${
                    filteredSupervisorsLength === 0
                        ? data.length
                        : filteredSupervisorsLength
                } supervisors found`}</p>

                <div className="pt-2 pb-8 xs:px-2 md:px-8 flex flex-col gap-6 w-full overflow-y-scroll max-h-screen">
                    {supervisorsToRender.map(
                        (supervisor: SupervisorT, index: number) => (
                            <SupervisorCard key={index} prof={supervisor} />
                        )
                    )}
                </div>
            </div>
        )
    } else {
        return <p className="top-20">No Data</p>
    }
}
