import { Link } from '@heroui/link'
import UniversityLogo from '../../global/university-image'
import { badgeStyle } from '@/@/lib/styles'
import { button as buttonStyles } from '@heroui/react'
import { Bookmark, MoveRightIcon, SeparatorVertical } from 'lucide-react'
import Image from 'next/image'
import { JobApiResponseSchema, JobCardType } from '@/@/lib/types/jobs/job-list'
import { dateFormat } from '@/@/utils/format'
import RichTextViewer from '../../global/rich-text-viewer'
import { useAppSelector } from '@/@/app/store/hooks'
import JobBookmarkButton from '../actions/bookmarks'

export default function JobDetails({job} : {job : JobCardType}) {
    const userType = useAppSelector((state) => state.auth.user?.userType)
    const headingStyle = 'text-foreground text-xs'
    const infoStyle = 'text-primary font-medium text-sm'
    return (
        <div className="w-full flex flex-col space-y-6 p-8">
            <div className="grid grid-cols-4">
                <div className="xs:col-span-4 lg:col-span-3 flex gap-4 items-start">
                    <UniversityLogo
                        path={job.university.logo}
                        name={job.university.name}
                        size={48}
                    />
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <h3 className="text-base font-medium text-foreground">
                                {job.jobTitle}
                            </h3>
                            <p className="text-sm text-foreground">
                                {job.discipline.name}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge-style">{job.jobType}</span>
                            <span className="badge-style">{job.jobMode}</span>
                            <span className="badge-style">
                                Minimum Qualification - {job.minimumQualification}
                            </span>
                            <span className="badge-style">
                                {job.university.name}
                            </span>
                            <span className="badge-style">
                                {job.university.city}, {job.university.countryCode}
                            </span>
                        </div>
                    </div>
                </div>
                {userType === 'student' && <div className="xs:col-span-4 lg:col-span-1 xs:mt-4 lg:mt-0 flex gap-2 justify-self-end items-center">
                    <Link
                        className={buttonStyles({
                            color: 'primary',
                            radius: 'full',
                            size: 'sm'
                        })}
                        href={`/jobs/apply/${job.uuid}`}
                    >
                        Apply Now
                        <MoveRightIcon size={20} strokeWidth={1} />
                    </Link>
                    <JobBookmarkButton job={job} />
                </div>}
            </div>
            <div className="flex xs:flex-col lg:flex-row items-center justify-between gap-4 py-2 px-4 rounded-2xl border-2 border-lightgray">
                <div className="xs:text-center lg:text-start">
                    <span className={headingStyle}>Discipline</span>
                    <p className={infoStyle}>{job.discipline.name}</p>
                </div>

                <SeparatorVertical strokeWidth={1} size={22} />

                <div className="xs:text-center lg:text-start">
                    <span className={headingStyle}>Sub-discipline</span>
                    <p className={infoStyle}>{job.subDiscipline.name}</p>
                </div>

                <SeparatorVertical strokeWidth={1} size={22} />

                <div className="xs:text-center lg:text-start">
                    <span className={headingStyle}>Application Deadline</span>
                    <p className={infoStyle}>{dateFormat(job.applicationDeadlineTimestamp)}</p>
                </div>

                <SeparatorVertical strokeWidth={1} size={22} />

                <div className="xs:text-center lg:text-start">
                    <span className={headingStyle}>Start Date</span>
                    <p className={infoStyle}>{dateFormat(job.startDateTimestamp)}</p>
                </div>

                <SeparatorVertical strokeWidth={1} size={22} />

                <div className="xs:text-center lg:text-start">
                    <span className={headingStyle}>Duration</span>
                    <p className={infoStyle}>{job.duration} months</p>
                    {/* TODO:: Months / Years? */}
                </div>
            </div>
            {/* Job Details --- starts */}
            <div className="max-w-4xl w-full p-6 bg-white rounded-lg">
                <div className="flex items-center gap-4 mb-6">
                    <Image
                        className="rounded-full p-1 border border-lightblue"
                        src={'/common.png'}
                        width={60}
                        height={60}
                        loading="lazy"
                        style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain'
                        }}
                        alt={'Supervisor'}
                    />
                    <div>
                        <h2 className="text-sm font-medium text-foreground">
                            {job.recruiter.firstName} {job.recruiter.lastName}
                        </h2>
                        {/* TODO:: No recruiter Details */}
                        {/* <p className="text-foreground text-xs">
                            Professor of Cybersecurity
                        </p>
                        <p className="text-foreground text-xs">PhD, MSc, MA</p> */}
                    </div>
                </div>
                <div>
                    <RichTextViewer contentString={job.jobDescription} />
                </div>
                <div>
                    <RichTextViewer contentString={job.applicationRequirement} />
                </div>
            </div>
            {/* Job Details --- Ends */}
        </div>
    )
}
