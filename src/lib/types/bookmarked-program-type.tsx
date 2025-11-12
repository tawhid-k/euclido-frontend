import { z } from 'zod'

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

const ApplicationFeeSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    category: z.string(),
    applicationFee: z.number(),
    currencyId: z.number(),
    applicationFeeInUsd: z.number(),
    currency: CurrencySchema
})

const ApplicationDeadlineSchema = z.object({
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
    programIntakeId: z.number()
})

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
    livingCost: LivingCostSchema
})

const DisciplineSchema = z.object({
    name: z.string(),
    slug: z.string(),
    parentId: z.null().or(z.number()),
    grandParentId: z.null().or(z.number()),
    icon: z.null().or(z.string()),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null()
})

const ProgramDisciplineSchema = z.object({
    programId: z.number(),
    disciplineId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    discipline: DisciplineSchema
})

const TuitionFeeSchema = z.object({
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

const TypeSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    programId: z.number(),
    type: z.string()
})

const CommitmentSchema = z.object({
    programId: z.number(),
    commitment: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null()
})

const SupervisorGroupSchema = z.object({
    universityId: z.number(),
    name: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    slug: z.string()
})

export const ProgramSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    name: z.string(),
    slug: z.string(),
    degreeLevel: z.string(),
    universityId: z.number(),
    overview: z.string(),
    departmentId: z.number(),
    schoolId: z.number(),
    facultyId: z.number(),
    programUrl: z.string(),
    totalCredit: z.number(),
    totalCourse: z.number(),
    deliveryLanguage: z.string(),
    isRolling: z.boolean(),
    supervisorGroupId: z.number(),
    applicationDeadlines: z.array(ApplicationDeadlineSchema),
    applicationFees: z.array(ApplicationFeeSchema),
    types: z.array(TypeSchema),
    commitments: z.array(CommitmentSchema),
    department: DepartmentSchema,
    faculty: DepartmentSchema,
    school: DepartmentSchema,
    programDisciplines: z.array(ProgramDisciplineSchema),
    programTags: z.array(z.any()),
    university: UniversitySchema,
    supervisorGroup: SupervisorGroupSchema,
    tuitionFees: z.array(TuitionFeeSchema),
    isBookmarked: z.boolean().default(true)
})

const BookmarkedProgramSchema = z.object({
    programId: z.number(),
    userId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.null(),
    program: ProgramSchema
})
export const bookmarkedProgramsArraySchema = z.array(BookmarkedProgramSchema)
export type BookmarkProgramDetailsT = z.infer<typeof ProgramSchema>
export type BookmarkedProgramT = z.infer<typeof BookmarkedProgramSchema>
