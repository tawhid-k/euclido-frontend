import { z } from 'zod'

const researchInterestSchema = z.object({
    name: z.string(),
    slug: z.string(),
    parentId: z.number(),
    grandParentId: z.number().nullable(),
    icon: z.string().nullable(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

const researchInterestItemSchema = z.object({
    researchInterestId: z.number(),
    supervisorId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    researchInterest: researchInterestSchema
})

const areaOfInterestSchema = z.object({
    name: z.string(),
    slug: z.string(),
    parentId: z.number(),
    grandParentId: z.number().nullable(),
    icon: z.string().nullable(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

const areaOfInterestItemSchema = z.object({
    areaOfInterestId: z.number(),
    supervisorId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    areaOfInterest: areaOfInterestSchema
})

const supervisorSchema = z.object({
    name: z.string(),
    designation: z.string(),
    citation: z.number(),
    hIndex: z.number(),
    contact: z.string(),
    googleScholarUrl: z.string(),
    avatarPath: z.string(),
    personalWebUrl: z.string(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    researchInterests: z.array(researchInterestItemSchema),
    areaOfInterests: z.array(areaOfInterestItemSchema)
})

const SupervisorSchema = z.object({
    supervisorGroupId: z.number(),
    supervisorId: z.number(),
    id: z.number(),
    uuid: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    supervisor: supervisorSchema,
    isBookmarked: z.boolean()
})

export type SupervisorT = z.infer<typeof SupervisorSchema>
