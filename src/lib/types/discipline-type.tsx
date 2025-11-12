import { z } from 'zod'

const DisciplineSchema = z.object({
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

const SubDisciplineSchema = z.object({
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

export type SubDisciplineT = z.infer<typeof SubDisciplineSchema>

export type DisciplineT = z.infer<typeof DisciplineSchema>
