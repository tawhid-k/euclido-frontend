import { z } from 'zod'

const DisciplineSchema = z.object({
    disciplineId: z.number(),
    studentId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
    discipline: z.object({
        name: z.string(),
        slug: z.string(),
        parentId: z.number().nullable(),
        grandParentId: z.number().nullable(),
        icon: z.string().nullable(),
        id: z.number(),
        uuid: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        deletedAt: z.string().datetime().nullable()
    })
})

export const AreaOfInterestSchema = z.object({
    areaOfInterestId: z.number(),
    studentId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
    areaOfInterest: z.object({
        name: z.string(),
        slug: z.string(),
        parentId: z.number().nullable(),
        grandParentId: z.number().nullable(),
        icon: z.string().nullable(),
        id: z.number(),
        uuid: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        deletedAt: z.string().datetime().nullable()
    })
})

const ResearchInterestSchema = z.object({
    researchInterestId: z.number(),
    studentId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
    researchInterest: z.object({
        name: z.string(),
        slug: z.string(),
        parentId: z.number().nullable(),
        grandParentId: z.number().nullable(),
        icon: z.string().nullable(),
        id: z.number(),
        uuid: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        deletedAt: z.string().datetime().nullable()
    })
})

const RoleSchema = z.object({
    name: z.string(),
    isDefault: z.boolean(),
    id: z.number(),
    slug: z.string(),
    permissions: z.array(z.any())
})

export const StudentDetailsSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.string().datetime().nullable(),
    userId: z.number(),
    country: z.string(),
    countryName: z.string(),
    stateName: z.string(),
    state: z.string()
})

const ProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
    userType: z.string(),
    authProvider: z.string().nullable(),
    avatarPath: z.string().nullable(),
    id: z.number(),
    uuid: z.string(),
    isEmailVerified: z.boolean(),
    role: RoleSchema,
    studentDetails: StudentDetailsSchema,
    disciplines: z.array(DisciplineSchema),
    areaOfInterests: z.array(AreaOfInterestSchema),
    researchInterests: z.array(ResearchInterestSchema)
})

export type ResearchInterestT = z.infer<typeof ResearchInterestSchema>
export type ProfileT = z.infer<typeof ProfileSchema>
export type AreaOfInterestT = z.infer<typeof AreaOfInterestSchema>
