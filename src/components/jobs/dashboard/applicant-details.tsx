import { getApplicantDetails, rejectApplicant, shortListApplicant } from '@/@/api/jobs/dashboard'
import useJobStore from '@/@/context/jobs/dashboard-context'
import { JobApplicantDetails, safeValidateJobApplication } from '@/@/lib/types/jobs/applicant-details'
import { ApplicantType } from '@/@/lib/types/jobs/job-list'
import {
    BookmarkCheck,
    BookmarkX,
    CloudDownload,
    EyeClosed,
    FileText,
    Mail,
    MapPinHouse,
    Paperclip
} from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ApplicantDetails = ({jobUuid, applicant} : {jobUuid: string, applicant: ApplicantType}) => {
    const [isShortlisting, setIsShortlisting] = useState(false)
    const [isRejecting, setIsRejecting] = useState(false)
    const [localApplicant, setLocalApplicant] = useState<JobApplicantDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const fetchJobs = useJobStore(state => state.fetchJobs)
    
    useEffect(() => {
        const fetchApplicantDetails = async () => {
            try {
                setIsLoading(true)
                const response = await getApplicantDetails(jobUuid, applicant.uuid)
                const parsedResponse = safeValidateJobApplication(response)
                setLocalApplicant(parsedResponse.data)
            } catch (error) {
                // <Toast title='Some error occured' color='error' />
                console.error('Error fetching applicant details:', error)
                
                toast.error('An error occurred while fetching applicant details')
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchApplicantDetails()
    }, [jobUuid, applicant.uuid, applicant])
    
    const handleShortlist = async () => {
        try {
            setIsShortlisting(true)
            const response = await shortListApplicant(jobUuid, applicant.uuid)
            
            if (response.statusCode === 200) {
                setLocalApplicant({
                    ...(localApplicant as JobApplicantDetails),
                    isShortListed: true
                })
                fetchJobs()
                toast.success('Applicant has been shortlisted successfully')
            } else {
                toast.error(response.message || 'Failed to shortlist applicant')
            }
        } catch (error) {
            toast.error('An error occurred while shortlisting the applicant')
            console.error(error)
        } finally {
            setIsShortlisting(false)
        }
    }

    const handleReject = async () => {
        try {
            setIsRejecting(true)
            const response = await rejectApplicant(jobUuid, applicant.uuid)
            
            if (response.statusCode === 200) {
                setLocalApplicant({
                    ...(localApplicant as JobApplicantDetails),
                    isShortListed: true
                })
                fetchJobs()
                toast.success('Applicant has been rejected')
            } else {
                toast.error(response.message || 'Failed to reject applicant')
            }
        } catch (error) {
            toast.error('An error occurred while rejecting the applicant')
            console.error(error)
        } finally {
            setIsRejecting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-screen-lg mx-auto p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-foreground">Loading applicant details...</p>
                </div>
            </div>
        )
    }

    if (!localApplicant) {
        return (
            <div className="max-w-screen-lg mx-auto p-6 text-center">
                <p className="text-foreground">No applicant details available.</p>
            </div>
        )
    }

    return (
        <div className="max-w-screen-lg mx-auto p-6 text-foreground">
            {/* Profile Section */}
            <div className="pt-2 flex flex-col items-center text-center">
                <label className="text-foreground font-semibold text-2xl rounded-full p-12 bg-[#F1F6F7]/40 flex items-center justify-center relative max-w-fit overflow-hidden">
                    <p className="absolute">{localApplicant.user.firstName[0]+localApplicant.user.lastName[0]}</p>
                </label>
                <h2 className="text-2xl font-semibold mt-4 text-foreground">
                    {localApplicant.user.firstName} {localApplicant.user.lastName}
                </h2>
                <div className="mt-2 flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <Mail
                            className="text-foreground"
                            size={22}
                            strokeWidth={1}
                        />
                        <span className="text-sm">{applicant.user.email}</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <MapPinHouse
                            className="text-foreground"
                            size={22}
                            strokeWidth={1}
                        />
                        {/* TODO:: Add location */}
                        <span className="text-sm">{`${localApplicant.user.studentDetails?.stateName}, ${localApplicant.user.studentDetails?.countryName}`}</span>
                    </label>
                </div>
            </div>

            {/* area */}
            {/* FIXME: Discipline, Sub-Discipline are not available */}
            {/* TODO:: Add discipline */}
            {/* <div className="flex flex-col items-center gap-2 text-foreground text-sm w-full pt-6">
                <div className="flex items-center justify-center gap-2">
                    {[
                        'Discipline'
                    ].map((areaOfInterest, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 font-medium"
                        >
                            <span>{areaOfInterest}</span>
                            {index !== areaOfInterest.length - 1 && (
                                <span>
                                    <SeparatorVertical
                                        strokeWidth={1}
                                        size={22}
                                    />
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-center text-foreground/80">
           
                    {[
                        'Sub-discipline',
                    ].map((researchInterest, index) => (
                        <div
                            key={index}
                            className=" max-w-fit flex items-center justify-center gap-2 w-full"
                        >
                            <span className="max-w-fit">
                                {researchInterest}
                            </span>
                            {index !== researchInterest.length - 1 && (
                                <span>
                                    <SeparatorVertical
                                        strokeWidth={1}
                                        size={22}
                                    />
                                </span>
                            )}
                        </div>
                    ))}
                </div>

            </div> */}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <button 
                    disabled={localApplicant.isShortListed || isShortlisting} 
                    onClick={handleShortlist}
                    className="px-4 py-2 bg-[#D7F7D8] hover:bg-green-200 text-[#3E9741] rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-150"
                >
                    <BookmarkCheck /> 
                    <span>
                        {isShortlisting 
                            ? 'Processing...' 
                            : localApplicant.isShortListed 
                                ? 'Application shortlisted' 
                                : 'Shortlist applicant'
                        }
                    </span>
                </button>
                <button disabled={localApplicant.isRejected || false} onClick={handleReject} className="px-4 py-2 bg-[#FFD9E6] hover:bg-red-200 text-[#A64D6B] rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-150">
                    <BookmarkX /> <span>
                    {isRejecting 
                            ? 'Processing...' 
                            : localApplicant.isRejected
                                ? 'Applicat rejeted' 
                                : 'Reject applicant'
                        }
                    </span>
                </button>
            </div>

            {/* Attachments Section */}
            <div className="mt-10">
                <h3 className="flex items-center gap-2 font-semibold text-primary">
                    <span>
                        <Paperclip strokeWidth={1} />
                    </span>
                    <span>Attachments from the applicant</span>
                </h3>
                {/* TODO: Show attachments */}
                <div className="mt-8 flex flex-col gap-6">
                    {applicant.jobApplicationAttachments.map((file, index) => (
                        <div
                            key={index}
                            className="flex justify-between gap-4 items-center text-gray-700"
                        >
                            <div className="flex items-center">
                                <FileText
                                    className="text-[#939393]"
                                    strokeWidth={1}
                                    size={40}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm max-w-sm truncate font-medium text-foreground">
                                        {file.attachmentPath}
                                    </span>
                                    <span className="text-xs text-foreground/50">
                                        120kb
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="border-1 border-lightgray rounded-md p-1 cursor-pointer">
                                    <EyeClosed
                                        className="text-primary"
                                        size={22}
                                        strokeWidth={1}
                                    />
                                </div>
                                <div 
                                    className="border-1 border-lightgray rounded-md p-1 cursor-pointer"
                                    onClick={() => {
                                        const downloadUrl = localApplicant?.jobApplicationAttachments.find(
                                            attachment => attachment.attachmentPath.includes(file.attachmentPath)
                                        )?.attachmentUrl || file.attachmentUrl || file.attachmentPath;
                                        const link = document.createElement('a');
                                        link.href = downloadUrl;
                                        link.setAttribute('download', file.attachmentPath.split('/').pop() || file.attachmentPath);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    <CloudDownload
                                        className="text-primary"
                                        size={22}
                                        strokeWidth={1}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ApplicantDetails
