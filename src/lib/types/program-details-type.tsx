import { z } from 'zod'

// Currency schema
const CurrencySchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    name: z.string(),
    code: z.string(),
    symbol: z.string(),
    symbolNative: z.string(),
    namePlural: z.string(),
    position: z.string(),
    decimalPlaces: z.number(),
    thousandSeparator: z.string(),
    decimalSeparator: z.string(),
    conversionRate: z.number()
})

// Living cost schema
const LivingCostSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    countryCode: z.string(),
    country: z.string(),
    flag: z.string(),
    stateCode: z.string(),
    state: z.string(),
    city: z.string(),
    livingCost: z.number()
})

// University details schema
const UniversityDetailsSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    academicStaffCount: z.string(),
    administrativeStaffCount: z.string(),
    studentCount: z.string(),
    universityId: z.number()
})

// University schema
const UniversitySchema = z.object({
    name: z.string(),
    websiteUrl: z.string(),
    qsScore: z.number(),
    ranking: z.number(),
    acceptanceRate: z.number(),
    countryCode: z.string(),
    stateCode: z.string(),
    city: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    slug: z.string(),
    logo: z.string(),
    livingCostId: z.number(),
    livingCost: LivingCostSchema,
    universityDetails: UniversityDetailsSchema.nullable()
})

// Department/School/Faculty schema
const DepartmentSchema = z.object({
    universityId: z.number(),
    name: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    slug: z.string()
})

// Program type schema
const ProgramTypeSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    type: z.string()
})

// Commitment schema
const CommitmentSchema = z.object({
    programId: z.number(),
    commitment: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null()
})

// Duration schema
const DurationSchema = z.object({
    programId: z.number(),
    duration: z.number(),
    commitment: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null()
})

// Tuition fee schema
const TuitionFeeSchema = z.object({
    tuitionFee: z.number(),
    currency: z.string()
})

// Tuition fee details schema
const TuitionFeeDetailsSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    commitment: z.string(),
    category: z.string(),
    deliveryMode: z.string(),
    tuitionFee: z.number(),
    currencyId: z.number(),
    tuitionFeeInUsd: z.number(),
    perYear: z.boolean(),
    currency: CurrencySchema
})

// GPA requirement schema
const GpaRequirementSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    gpaPoint: z.number(),
    gpaLetter: z.string(),
    gpaPercentage: z.number(),
    division: z.string(),
    minimumGpaPoint: z.number(),
    minimumGpaPercentage: z.number()
})

// GMAT/GRE requirement schema
const StandardizedTestRequirementSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    requirement: z.string()
})

// IELTS requirement schema
const IeltsRequirementSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    overall: z.number(),
    listening: z.number().nullable(),
    reading: z.number().nullable(),
    writing: z.number().nullable(),
    speaking: z.number().nullable()
})

// TOEFL requirement schema
const ToeflRequirementSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    overall: z.number(),
    listening: z.null(),
    reading: z.null(),
    writing: z.null(),
    speaking: z.null()
})

// Admission requirements schema
const AdmissionRequirementsSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    programGpaRequirementId: z.number(),
    programGmatRequirementId: z.number(),
    programGreRequirementId: z.number(),
    programIeltsRequirementId: z.number(),
    programToeflRequirementId: z.number(),
    programGpaRequirement: GpaRequirementSchema,
    programGmatRequirement: StandardizedTestRequirementSchema,
    programGreRequirement: StandardizedTestRequirementSchema,
    programIeltsRequirement: IeltsRequirementSchema,
    programToeflRequirement: ToeflRequirementSchema
})

// Funding schema
const FundingSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    minimumDepartmentalFunding: z.number(),
    averageDepartmentalFunding: z.number(),
    currencyId: z.number(),
    currency: CurrencySchema
})

// Program intake schema
const ProgramIntakeSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    month: z.string(),
    commitment: z.string(),
    intake: z.string(),
    slug: z.string()
})

// Deadline schema
const DeadlineSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    deadlineName: z.string(),
    slug: z.string(),
    category: z.string(),
    commitment: z.string(),
    deadlineTimestamp: z.string(),
    programIntakeId: z.number(),
    programIntake: ProgramIntakeSchema
})

export const ProgramDetailsSchema = z.object({
    name: z.string(),
    type: z.array(ProgramTypeSchema),
    degreeLevel: z.string(),
    commitment: z.array(CommitmentSchema),
    duration: z.array(DurationSchema),
    totalCredit: z.number(),
    url: z.string(),
    applicationDeadline: z.string(),
    programIntake: z.null(),
    applicationFee: z.number(),
    applicationFeeCurrency: z.string(),
    overview: z.string(),
    university: UniversitySchema,
    tuitionFee: TuitionFeeSchema,
    tuitionFeesDetails: z.array(TuitionFeeDetailsSchema),
    addmissionRequirements: AdmissionRequirementsSchema,
    funding: FundingSchema,
    department: DepartmentSchema,
    school: DepartmentSchema,
    faculty: DepartmentSchema,
    closestDeadline: z.union([z.null(), DeadlineSchema]),
    closestIntake: z.string(),
    deadlines: z.array(DeadlineSchema),
    intakes: z.array(ProgramIntakeSchema),
    isBookmarked: z.boolean()
})

export type ProgramDetailsTuitionFeeDetails = z.infer<
    typeof TuitionFeeDetailsSchema
>
export type ProgramDetailsProgramType = z.infer<typeof ProgramTypeSchema>
export type ProgramDetailsProgramCommitment = z.infer<typeof CommitmentSchema>
export type ProgramDetailsT = z.infer<typeof ProgramDetailsSchema>
