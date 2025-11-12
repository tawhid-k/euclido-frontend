import { z } from "zod";

// Recruiter schema
const RecruiterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  userType: z.string(),
  roleId: z.number(),
  authProvider: z.string(),
  avatarPath: z.string(),
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional(),
  isEmailVerified: z.boolean(),
  isPhoneVerified: z.boolean(),
  code: z.string(),
  hash: z.string(),
  codeExpiredAt: z.number()
});

// University schema
const UniversitySchema = z.object({
  name: z.string(),
  websiteUrl: z.string().url(),
  qsScore: z.number(),
  ranking: z.number(),
  acceptanceRate: z.number(),
  countryCode: z.string(),
  stateCode: z.string(),
  city: z.string(),
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional(),
  slug: z.string(),
  logo: z.string(),
  livingCostId: z.number()
});

// Discipline schema
const DisciplineSchema = z.object({
  name: z.string(),
  slug: z.string(),
  parentId: z.number().nullable(),
  grandParentId: z.number().nullable(),
  icon: z.string().nullable(),
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional()
});

// User schema for job applicants
const ApplicantUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  userType: z.string(),
  roleId: z.number(),
  authProvider: z.string(),
  avatarPath: z.string(),
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional(),
  isEmailVerified: z.boolean(),
  isPhoneVerified: z.boolean(),
  code: z.string(),
  hash: z.string(),
  codeExpiredAt: z.number()
});

const JobApplicationAttachmentSchema = z.array(
  z.object({
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null().optional(),
    applicantId: z.number(),
    attachmentPath: z.string().url(),
    attachmentUrl: z.string().url().optional(),
  })
);

// Applicant schema
const ApplicantSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional(),
  userId: z.number(),
  jobId: z.number(),
  academicQualification: z.string(),
  googleScholarUrl: z.string().url(),
  otherProfile: z.string().url(),
  linkedinUrl: z.string().url(),
  shareEuclidoProfile: z.boolean(),
  isShortListed: z.boolean().nullable(),
  isRejected: z.boolean().nullable(),
  user: ApplicantUserSchema,
  jobApplicationAttachments: JobApplicationAttachmentSchema
});

// Job schema
const JobSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional(),
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
  isBookmarked: z.boolean().optional(),
  isDraft: z.boolean(),
  university: UniversitySchema,
  discipline: DisciplineSchema,
  subDiscipline: DisciplineSchema,
  recruiter: RecruiterSchema,
  applicants: z.array(ApplicantSchema)
});

// Meta schema
const MetaSchema = z.object({
  totalItems: z.number(),
  itemCount: z.number(),
  itemsPerPage: z.number(),
  totalPages: z.number(),
  currentPage: z.number()
});

// Links schema
const LinksSchema = z.object({
  first: z.string().url(),
  previous: z.string(),
  next: z.string().url(),
  last: z.string().url()
});

// Response schema
const JobApiResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  result: z.array(JobSchema),
  meta: MetaSchema,
  links: LinksSchema
});

// Bookmarked Job schema
const BookmarkedJobSchema = z.object({
  jobId: z.number(),
  userId: z.number(),
  id: z.number(),
  uuid: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.null().optional(),
  job: z.object({
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null().optional(),
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
});

// Bookmarked Jobs API Response schema
const BookmarkedJobsApiResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  result: z.array(BookmarkedJobSchema),
  meta: MetaSchema,
  links: LinksSchema
});

// Infer TypeScript type from schema
type JobApiResponse = z.infer<typeof JobApiResponseSchema>;
type BookmarkedJobsApiResponse = z.infer<typeof BookmarkedJobsApiResponseSchema>;
type BookmarkedJobType = z.infer<typeof BookmarkedJobSchema>;
type JobCardDetails = z.infer<typeof JobSchema>;
export type JobCardType = z.infer<typeof JobSchema>;
export type ApplicantType = z.infer<typeof ApplicantSchema>;
export {
  JobApiResponseSchema,
  BookmarkedJobsApiResponseSchema,
  JobSchema,
  BookmarkedJobSchema,
  UniversitySchema,
  DisciplineSchema,
  RecruiterSchema,
  MetaSchema,
  LinksSchema,
  ApplicantSchema,
  ApplicantUserSchema,
  type JobCardDetails,
  type JobApiResponse,
  type BookmarkedJobsApiResponse,
  type BookmarkedJobType
};