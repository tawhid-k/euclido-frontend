'use client'
import { postJobApplication } from '@/@/api/jobs/student-jobs'
import { Alert } from '@heroui/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import ToggleSwitch from '../global/toggle'

interface FormData {
    jobUuid: string
    academicQualification: string
    googleScholarUrl: string
    otherProfile: string
    linkedinUrl: string
    shareEuclidoProfile: boolean
    attachments: File[] 
}

interface FormErrors {
    academicQualification?: string;
    googleScholarUrl?: string;
    otherProfile?: string;
    linkedinUrl?: string;
}

const ApplicationForm: React.FC<{ uuid: string }> = ({ uuid }) => {
    const labelStyle = 'block text-xs text-foreground/80 mb-1'
    const inputStyle =
        'w-full text-sm px-3 py-1 border rounded-full focus:outline-none placeholder:text-xs'
    
    // Initialize form state
    const [formData, setFormData] = useState<FormData>({
        jobUuid: uuid,
        academicQualification: '',
        googleScholarUrl: '',
        otherProfile: '',
        linkedinUrl: '',
        shareEuclidoProfile: false,
        attachments: [],
    })
    
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form validation
    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {}
        
        // Required field validation
        if (!formData.academicQualification.trim()) {
            newErrors.academicQualification = 'Academic qualification is required'
        }
    
        // Removed URL validations for Google Scholar, Other Profile, and LinkedIn
    
        return newErrors
    }

    // File handling with improved error handling
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        // Validate files (only PDF and size limit)
        const validFiles: File[] = [];
        const maxSize = 1024 * 1024; // 1MB
        let hasErrors = false;
        
        Array.from(files).forEach(file => {
            if (file.type !== 'application/pdf') {
                toast.error('Only PDF files are allowed');
                hasErrors = true;
                return;
            }
            
            if (file.size > maxSize) {
                toast.error(`File ${file.name} exceeds the 1MB limit`);
                hasErrors = true;
                return;
            }
            
            validFiles.push(file);
        });
        
        if (!hasErrors && validFiles.length > 0) {
            setFormData(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...validFiles]
            }));
        }
        
        // Reset the input to allow selecting the same file again
        e.target.value = '';
    };
    
    // Remove file function
    const removeFile = (index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    // Form submission with improved error handling
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Create FormData object for file upload
            const formDataToSend = new FormData();
            
            // Add all form fields except attachments
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'attachments') {
                    formDataToSend.append(key, String(value));
                }
            });
            
            // Add attachments with unique names to prevent conflicts
            formData.attachments.forEach((file, index) => {
                formDataToSend.append(`attachments`, file);
            });
            
            // Submit the form
            const response = await postJobApplication(formDataToSend);
            
            if (response.statusCode === 201) {
                toast.custom(
                    <div key={'success'} className="max-w-fit">
                        <Alert
                            variant="faded"
                            color={'success'}
                            title={'Application successful'}
                            description={response.message}
                        />
                    </div>
                );
                
                // Reset form after successful submission
                setFormData({
                    jobUuid: uuid,
                    academicQualification: '',
                    googleScholarUrl: '',
                    otherProfile: '',
                    linkedinUrl: '',
                    shareEuclidoProfile: false,
                    attachments: [],
                });
            } else {
                toast.custom(
                    <div key={'error'} className="max-w-fit">
                        <Alert
                            variant="faded"
                            color={'danger'}
                            title={'Application failed'}
                            description={response.message || 'Something went wrong'}
                        />
                    </div>
                );
            }
        } catch (error) {
            console.error('Application submission error:', error);
            toast.custom(
                <div key={'error'} className="max-w-fit">
                    <Alert
                        variant="faded"
                        color={'danger'}
                        title={'Application failed'}
                        description={'An error occurred while submitting your application'}
                    />
                </div>
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle form field changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    
        // Clear error when field is edited
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    // Rest of the component remains the same
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl p-6">
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold mb-6 text-foreground">
                    Apply for this position
                </h2>

                {/* Academic Qualification field */}
                <div className="mb-4">
                    <label className={labelStyle}>Academic Qualification</label>
                    <select
                        name="academicQualification"
                        value={formData.academicQualification}
                        onChange={handleChange}
                        className={`${inputStyle} ${
                            errors.academicQualification ? 'border-red-500' : 'border-lightgray'
                        }`}
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
                    {errors.academicQualification && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.academicQualification}
                        </p>
                    )}
                </div>

                {/* Other form fields */}
                <div className="mb-4">
                    <label className={labelStyle}>Google Scholar Profile</label>
                    <input
                        type="url"
                        name="googleScholarUrl"
                        value={formData.googleScholarUrl}
                        onChange={handleChange}
                        className={`${inputStyle} ${
                            errors.googleScholarUrl ? 'border-red-500' : 'border-lightgray'
                        }`}
                    />
                    {errors.googleScholarUrl && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.googleScholarUrl}
                        </p>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className={labelStyle}>Other Profile</label>
                    <input
                        type="url"
                        name="otherProfile"
                        value={formData.otherProfile}
                        onChange={handleChange}
                        className={`${inputStyle} ${
                            errors.otherProfile ? 'border-red-500' : 'border-lightgray'
                        }`}
                    />
                    {errors.otherProfile && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.otherProfile}
                        </p>
                    )}
                </div>
                
                <div className="mb-4">
                    <label className={labelStyle}>LinkedIn Profile</label>
                    <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className={`${inputStyle} ${
                            errors.linkedinUrl ? 'border-red-500' : 'border-lightgray'
                        }`}
                    />
                    {errors.linkedinUrl && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.linkedinUrl}
                        </p>
                    )}
                </div>
                
                {/* File upload section */}
                <div className="mb-6">
                    <label className={labelStyle}>Attachments</label>
                    <div 
                        className="border-2 border-dashed rounded-lg p-4 text-center text-[#A1A1A1] relative cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <input
                            id="file-upload"
                            type="file"
                            name="attachments"
                            accept=".pdf"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="mb-2">
                            <svg
                                className="w-6 h-6 mx-auto text-[#A1A1A1]"
                                fill="none"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                                />
                            </svg>
                        </div>
                        <p>Drag files here or click to select</p>
                        <p className="text-xs">
                            Only PDF files are allowed with maximum size of 1MB
                        </p>
                    </div>
                    
                    {/* Display selected files */}
                    {formData.attachments.length > 0 && (
                        <div className="mt-2">
                            <p className="text-xs font-medium mb-1">Selected files:</p>
                            <ul className="text-xs space-y-1">
                                {formData.attachments.map((file, index) => (
                                    <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                        <span className="truncate">{file.name}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Update the toggle switch section in the return statement */}
                <div className="flex items-start space-x-4 mb-6">
                    <label className="inline-flex items-center cursor-pointer">
                        <span className="ml-2">
                            <span className="block text-sm mb-2 font-medium text-foreground">
                                Share my info from Euclido
                            </span>
                            <span className="block text-xs text-foreground">
                                We will share your areas of interest and
                                research interests from Euclido profile with the
                                hiring team
                            </span>
                        </span>
                    </label>
                    <ToggleSwitch 
                        value={formData.shareEuclidoProfile}
                        onChange={(checked) => setFormData(prev => ({
                            ...prev,
                            shareEuclidoProfile: checked
                        }))}
                    />
                </div>

                {/* Update the button to show loading state */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting ? 'bg-primary/70' : 'bg-primary'} text-white py-2 px-4 rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
                >
                    {isSubmitting ? 'APPLYING...' : 'APPLY'}
                </button>
            </form>
        </div>
    )
}

export default ApplicationForm
