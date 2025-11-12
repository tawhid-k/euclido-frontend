import { z } from 'zod'

const ResearchInterestSchema = z.object({
    name: z.string(),
    slug: z.string(),
    parentId: z.number(),
    grandParentId: z.number(),
    icon: z.null(),
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null()
})

const ResearchInterestRelationshipSchema = z.object({
    researchInterestId: z.number(),
    supervisorId: z.number(),
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null(),
    researchInterest: ResearchInterestSchema
})

const SupervisorSchema = z.object({
    name: z.string(),
    designation: z.string(),
    citation: z.number(),
    hIndex: z.number(),
    contact: z.string().email(),
    googleScholarUrl: z.string().url(),
    avatarPath: z.string().url(),
    personalWebUrl: z.string().url(),
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null(),
    researchInterests: z.array(ResearchInterestRelationshipSchema)
})

const BookmarkedSupervisorSchema = z.object({
    supervisorId: z.number(),
    userId: z.number(),
    id: z.number(),
    uuid: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    deletedAt: z.null(),
    supervisor: SupervisorSchema,
    isBookmarked: z.boolean().default(true)
})

export type BookmarkedSupervisorT = z.infer<typeof BookmarkedSupervisorSchema>
