import { z } from 'zod'

// Base schemas
const BaseSchema = z.object({
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null().optional()
})

// Student Details Schema
const StudentDetailsSchema = BaseSchema.extend({
    userId: z.number(),
    country: z.string(),
    countryName: z.string(),
    state: z.string(),
    stateName: z.string()
})

// Discipline Schema
const DisciplineSchema = BaseSchema.extend({
    disciplineId: z.number(),
    studentId: z.number()
})

// Research Interest Schema
const ResearchInterestSchema = BaseSchema.extend({
    researchInterestId: z.number(),
    studentId: z.number()
})

// Area of Interest Schema
const AreaOfInterestSchema = BaseSchema.extend({
    areaOfInterestId: z.number(),
    studentId: z.number()
})

// Job Schema
const JobSchema = BaseSchema.extend({
    jobTitle: z.string(),
    slug: z.string(),
    position: z.string(),
    jobDescription: z.string(),
    applicationRequirement: z.string(),
    universityId: z.number(),
    disciplineId: z.number(),
    subDisciplineId: z.number(),
    minimumQualification: z.string(),
    jobType: z.string(),
    jobMode: z.string(),
    applicationDeadlineTimestamp: z.string(),
    startDateTimestamp: z.string(),
    duration: z.string(),
    keywords: z.string(),
    emailNotification: z.boolean(),
    sentApplicationToEmail: z.boolean(),
    isActive: z.boolean(),
    recruiterId: z.number(),
    isDraft: z.boolean()
})

// User Schema
const UserSchema = BaseSchema.extend({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    userType: z.string(),
    roleId: z.number(),
    authProvider: z.string(),
    avatarPath: z.string(),
    isEmailVerified: z.boolean(),
    isPhoneVerified: z.boolean(),
    code: z.string().nullable(),
    hash: z.string().nullable(),
    codeExpiredAt: z.number().nullable(),
    studentDetails: StudentDetailsSchema.nullable(),
    disciplines: z.array(DisciplineSchema),
    researchInterests: z.array(ResearchInterestSchema),
    areaOfInterests: z.array(AreaOfInterestSchema)
})

// Job Application Attachment Schema
const JobApplicationAttachmentSchema = BaseSchema.extend({
    applicantId: z.number(),
    attachmentPath: z.string(), // Changed from z.string().url() to accept any string
    attachmentUrl: z.string().url().optional()
})

const JobApplicantSchema = BaseSchema.extend({
    userId: z.number(),
    jobId: z.number(),
    academicQualification: z.string(),
    googleScholarUrl: z.string().url(),
    otherProfile: z.string().url(),
    linkedinUrl: z.string().url(),
    shareEuclidoProfile: z.boolean(),
    isShortListed: z.boolean().nullable(),
    isRejected: z.boolean().nullable(),
    job: JobSchema,
    user: UserSchema,
    jobApplicationAttachments: z.array(JobApplicationAttachmentSchema)
})

export type StudentDetails = z.infer<typeof StudentDetailsSchema>
export type Discipline = z.infer<typeof DisciplineSchema>
export type ResearchInterest = z.infer<typeof ResearchInterestSchema>
export type AreaOfInterest = z.infer<typeof AreaOfInterestSchema>
export type Job = z.infer<typeof JobSchema>
export type User = z.infer<typeof UserSchema>
export type JobApplicationAttachment = z.infer<
    typeof JobApplicationAttachmentSchema
>
export type JobApplicantDetails = z.infer<typeof JobApplicantSchema>

function validateJobApplication(data: unknown): JobApplicantDetails {
    return JobApplicantSchema.parse(data)
}

export function safeValidateJobApplication(data: any): {
    success: true | false
    data: JobApplicantDetails | null
} {
    try {
        const validated = JobApplicantSchema.parse(data)
        return { success: true, data: validated }
    } catch (error) {
        console.log(error)
        return { success: false, data: null }
    }
}
