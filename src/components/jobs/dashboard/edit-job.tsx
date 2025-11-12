'use client'

import { PencilRuler, Plus, Send } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getUniversityList, getDisciplineList, getSubDisciplineList, getJobDetails } from '@/@/api/common'
import RichTextEditor from './text-editor'
import { postRequest } from '@/@/service/api-handler/post-manager'
import { JobFormData } from '@/@/lib/types/jobs/job-form'
import { Alert, Spinner } from '@heroui/react'
import { patchRequest } from '@/@/service/api-handler/patch-manager'
import toast from 'react-hot-toast'

export default function EditJob({uuid, onClose}: {uuid: string, onClose?: () => void}) {
    const [universities, setUniversities] = useState<Array<{name: string, uuid: string}>>([]);
    const [disciplines, setDisciplines] = useState<Array<{name: string, uuid: string}>>([]);
    const [subDisciplines, setSubDisciplines] = useState<Array<{name: string, uuid: string}>>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        watch
    } = useForm<JobFormData>({
        defaultValues: {
            jobTitle: '',
            position: '',
            jobDescription: '',
            applicationRequirement: '',
            universityUuid: '',
            disciplineUuid: '',
            subDisciplineUuid: '',
            minimumQualification: 'bachelor',
            jobType: 'full-time',
            jobMode: 'on-site',
            applicationDeadlineTimestamp: '',
            startDateTimestamp: '',
            duration: 0,
            keywords: '',
            emailNotification: true,
            sentApplicationToEmail: true,
            isDraft: true,
            isActive: false
        }
    });

    // Fetch job data if uuid is provided
    useEffect(() => {
        const fetchJobData = async () => {
            if (uuid) {
                try {
                    setIsLoading(true);
                    const jobData = await getJobDetails(uuid);
                    console.log('Job data:', jobData);
                    
                    // Format dates from timestamps to YYYY-MM-DD for date inputs
                    const formatDate = (timestamp: string | number) => {
                        if (!timestamp) return '';
                        // Handle timestamp that might be a string
                        const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
                        const date = new Date(numericTimestamp);
                        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
                    };
                    
                    const parseRichText = (jsonString: string) => {
                        if (!jsonString) return ''; 
                        try {
                            // Handle double-quoted JSON string
                            if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
                                // Remove the outer quotes and parse the inner JSON
                                const innerJson = jsonString.substring(1, jsonString.length - 1);
                                // Need to unescape the inner JSON string
                                const unescapedJson = innerJson.replace(/\\"/g, '"');
                                return unescapedJson;
                            }
                            
                            // Regular JSON string
                            return jsonString;
                        } catch (error) {
                            console.error('Error parsing rich text:', error);
                            return jsonString;
                        }
                    };
                    
                    // Reset form with fetched data
                    reset({
                        jobTitle: jobData.jobTitle || '',
                        position: jobData.position || '',
                        jobDescription: parseRichText(jobData.jobDescription),
                        applicationRequirement: parseRichText(jobData.applicationRequirement),
                        universityUuid: jobData.university?.uuid || '',
                        disciplineUuid: jobData.discipline?.uuid || '',
                        subDisciplineUuid: jobData.subDiscipline?.uuid || '',
                        minimumQualification: jobData.minimumQualification || 'bachelor',
                        jobType: jobData.jobType || 'full-time',
                        jobMode: jobData.jobMode || 'on-site',
                        applicationDeadlineTimestamp: formatDate(jobData.applicationDeadlineTimestamp),
                        // Instead of:
                        // applicationDeadlineTimestamp: Number(formatDate(jobData.applicationDeadlineTimestamp)),
                        
                        // And similarly for startDateTimestamp:
                        startDateTimestamp: formatDate(jobData.startDateTimestamp),
                        duration: parseInt(jobData.duration) || 0,
                        keywords: jobData.keywords || '',
                        emailNotification: jobData.emailNotification || true,
                        sentApplicationToEmail: jobData.sentApplicationToEmail || true,
                        isDraft: jobData.isDraft || false,
                        isActive: jobData.isActive || false
                    });
                    
                    // If discipline is available, fetch sub-disciplines
                    if (jobData.discipline?.uuid) {
                        const subDisciplinesData = await getSubDisciplineList(jobData.discipline.uuid);
                        setSubDisciplines(subDisciplinesData);
                    }
                } catch (error) {
                    console.error('Error fetching job data:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        
        
        fetchJobData();
    }, [uuid, reset]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [universitiesData, disciplinesData] = await Promise.all([
                    getUniversityList(),
                    getDisciplineList()
                ]);
                setUniversities(universitiesData);
                setDisciplines(disciplinesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectedDiscipline = watch('disciplineUuid');

    useEffect(() => {
        const fetchSubDisciplines = async () => {
            if (selectedDiscipline) {
                try {
                    const data = await getSubDisciplineList(selectedDiscipline);
                    setSubDisciplines(data);
                } catch (error) {
                    console.error('Error fetching sub-disciplines:', error);
                }
            } else {
                setSubDisciplines([]);
            }
        };
        fetchSubDisciplines();
    }, [selectedDiscipline]);

    const onSubmit = async (data: JobFormData, isDraft: boolean = false) => {
        try {
            setIsSubmitting(true);
            const submitData = {
                ...data,
                isDraft,
                isActive: !isDraft,
                jobDescription: JSON.stringify(data.jobDescription), 
                applicationRequirement: JSON.stringify(data.applicationRequirement), 
                applicationDeadlineTimestamp: new Date(data.applicationDeadlineTimestamp).getTime(),
                startDateTimestamp: new Date(data.startDateTimestamp).getTime(),
                duration: parseInt(data.duration as unknown as string, 10)
            };
            console.log(JSON.stringify(submitData))
            const response = await patchRequest(`secure/job/${uuid}`,submitData)
            console.log(response)
            
            // Check if response has statusCode 200 and close the modal
            if (response && response.statusCode === 200) {
                toast.custom(
                    <Alert
                        color="success"
                        variant="faded"
                        title="Changes saved"
                        description="Job description has been updated successfully"
                    />
                )
                if (onClose) {
                    onClose();
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to update job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditorChange = (field: 'jobDescription' | 'applicationRequirement', content: string) => {
        setValue(field, content);
    };

    const inputStyle = 'w-full border border-lightgray rounded-full text-sm placeholder:text-sm px-3 py-2 text-foreground';
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Spinner label="Loading job details..." />
            </div>
        )
    } 
    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, false))} className="w-full mx-auto p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2 items-center">
                    <Plus className="text-primary" />
                    <button className="text-lg font-medium text-primary">
                        Add new job opening
                    </button>
                </div>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => handleSubmit((data) => onSubmit(data, true))()}
                        disabled={isSubmitting}
                        className={`flex gap-1 items-center text-xs text-primary font-medium bg-button-light-primary hover:bg-button-light-primary/60 px-3 py-2 rounded-full ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <span>
                            <PencilRuler strokeWidth={1.5} size={20} />
                        </span>{' '}
                        <span>{isSubmitting ? 'Saving...' : 'Save as Draft'}</span>
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex gap-1 items-center text-xs text-white font-medium bg-primary hover:bg-primary/60 px-3 py-2 rounded-full ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <span>
                            <Send strokeWidth={1.5} size={20} />
                        </span>{' '}
                        <span>{isSubmitting ? 'Saving...' : 'Save & Publish'}</span>
                    </button>
                </div>
            </div>

            <div className="space-y-6 text-sm">
                <div>
                    <label className="block mb-2 text-sm text-foreground">
                        Job Title
                    </label>
                    <input
                        {...register('jobTitle', { required: 'Job title is required' })}
                        type="text"
                        className={`${inputStyle} ${errors.jobTitle ? 'border-red-500' : ''}`}
                        placeholder="Job Title"
                    />
                    {errors.jobTitle && (
                        <p className="mt-1 text-xs text-red-500">{errors.jobTitle.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm text-foreground">
                            Position
                        </label>
                        <input
                            {...register('position', { required: 'Position is required' })}
                            type="text"
                            className={`${inputStyle} ${errors.position ? 'border-red-500' : ''}`}
                            placeholder="Position"
                        />
                        {errors.position && (
                            <p className="mt-1 text-xs text-red-500">{errors.position.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-foreground">
                            University
                        </label>
                        <select
                            {...register('universityUuid', { required: 'University is required' })}
                            className={`${inputStyle} ${errors.universityUuid ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select University</option>
                            {universities.map((university) => (
                                <option key={university.uuid} value={university.uuid}>
                                    {university.name}
                                </option>
                            ))}
                        </select>
                        {errors.universityUuid && (
                            <p className="mt-1 text-xs text-red-500">{errors.universityUuid.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm text-foreground" htmlFor="discipline">
                            Discipline
                        </label>
                        <select
                            {...register('disciplineUuid', { required: 'Discipline is required' })}
                            id="discipline"
                            className={`${inputStyle} ${errors.disciplineUuid ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Discipline</option>
                            {disciplines.map((discipline) => (
                                <option key={discipline.uuid} value={discipline.uuid}>
                                    {discipline.name}
                                </option>
                            ))}
                        </select>
                        {errors.disciplineUuid && (
                            <p className="mt-1 text-xs text-red-500">{errors.disciplineUuid.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-foreground" htmlFor="subDiscipline">
                            Sub-discipline
                        </label>
                        <select
                            {...register('subDisciplineUuid', { required: 'Sub-discipline is required' })}
                            id="subDiscipline"
                            className={`${inputStyle} ${errors.subDisciplineUuid ? 'border-red-500' : ''}`}
                            disabled={!selectedDiscipline}
                        >
                            <option value="">Select Sub-discipline</option>
                            {subDisciplines.map((subDiscipline) => (
                                <option key={subDiscipline.uuid} value={subDiscipline.uuid}>
                                    {subDiscipline.name}
                                </option>
                            ))}
                        </select>
                        {errors.subDisciplineUuid && (
                            <p className="mt-1 text-xs text-red-500">{errors.subDisciplineUuid.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 text-sm text-foreground">
                            Minimum Qualification
                        </label>
                        <select
                            {...register('minimumQualification', { required: 'Minimum qualification is required' })}
                            className={`${inputStyle} ${errors.minimumQualification ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select Qualification</option>
                            <option value="bachelor">Bachelor&apos;s</option>
                            <option value="masters">Master&apos;s</option>
                            <option value="doctorate">Doctorate</option>
                            <option value="postdoctorate">Post Doctorate</option>
                            <option value="certificate">Certificate</option>
                            <option value="diploma">Diploma</option>
                            <option value="associate">Associate</option>
                            <option value="foundation">Foundation</option>
                            <option value="preparatory">Preparatory</option>
                            <option value="graduate_diploma">Graduate Diploma</option>
                        </select>
                        {errors.minimumQualification && (
                            <p className="mt-1 text-xs text-red-500">{errors.minimumQualification.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-foreground">
                            Job Type
                        </label>
                        <select
                            {...register('jobType', { required: 'Job type is required' })}
                            className={`${inputStyle} ${errors.jobType ? 'border-red-500' : ''}`}
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                        </select>
                        {errors.jobType && (
                            <p className="mt-1 text-xs text-red-500">{errors.jobType.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-foreground">
                            Job Mode
                        </label>
                        <select
                            {...register('jobMode', { required: 'Job mode is required' })}
                            className={`${inputStyle} ${errors.jobMode ? 'border-red-500' : ''}`}
                        >
                            <option value="on-site">On-site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                        {errors.jobMode && (
                            <p className="mt-1 text-xs text-red-500">{errors.jobMode.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 text-sm text-foreground" htmlFor="applicationDeadline">
                            Application Deadline
                        </label>
                        <input
                            {...register('applicationDeadlineTimestamp', { required: 'Deadline is required' })}
                            type="date"
                            className={`${inputStyle} ${errors.applicationDeadlineTimestamp ? 'border-red-500' : ''}`}
                        />
                        {errors.applicationDeadlineTimestamp && (
                            <p className="mt-1 text-xs text-red-500">{errors.applicationDeadlineTimestamp.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-foreground" htmlFor="jobStartDate">
                            Job Start Date
                        </label>
                        <input
                            {...register('startDateTimestamp', { required: 'Start date is required' })}
                            type="date"
                            className={`${inputStyle} ${errors.startDateTimestamp ? 'border-red-500' : ''}`}
                        />
                        {errors.startDateTimestamp && (
                            <p className="mt-1 text-xs text-red-500">{errors.startDateTimestamp.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-foreground" htmlFor="duration">
                            Duration (months)
                        </label>
                        <input
                            {...register('duration', { 
                                required: 'Duration is required',
                                min: { value: 1, message: 'Duration must be at least 1 month' },
                                validate: {
                                    integer: v => Number.isInteger(Number(v)) || 'Duration must be an integer'
                                }
                            })}
                            type="number"
                            step="1"
                            min="1"
                            className={`${inputStyle} ${errors.duration ? 'border-red-500' : ''}`}
                        />
                        {errors.duration && (
                            <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm text-foreground">
                        Job Description
                    </label>
                    <RichTextEditor
                        onChange={(content) => handleEditorChange('jobDescription', content)}
                        value={watch('jobDescription')}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-foreground">
                        Application Requirements
                    </label>

                    <RichTextEditor
                        onChange={(content) => handleEditorChange('applicationRequirement', content)}
                        value={watch('applicationRequirement')}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-foreground" htmlFor="keywords">
                        Keywords
                    </label>
                    <input
                        {...register('keywords', { required: 'Keywords are required' })}
                        type="text"
                        id="keywords"
                        className={`${inputStyle} ${errors.keywords ? 'border-red-500' : ''}`}
                        placeholder="e.g., On-site/Remote"
                    />
                    {errors.keywords && (
                        <p className="mt-1 text-xs text-red-500">{errors.keywords.message}</p>
                    )}
                </div>

                {/* Email notification settings */}
                <div className="flex gap-4 text-foreground">
                <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Turn on email notifications</p>
                            <p className="text-xs text-gray-500">
                                We will send you a notification to your email address when someone applies for this position
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                {...register('emailNotification')}
                                type="checkbox"
                                id="emailNotification"
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                    </div>

                    {/* Send Applications to Email Toggle */}
                    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-900">Send applications to my email</p>
                            <p className="text-xs text-gray-500">
                                We will send you a copy of each application to your email address
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                {...register('sentApplicationToEmail')}
                                type="checkbox"
                                id="sentApplicationToEmail"
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                    </div>
                </div>


            </div>
        </form>
    );
}
