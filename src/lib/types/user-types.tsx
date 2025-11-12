import { z } from 'zod'

const RoleSchema = z.object({
    name: z.string(),
    isDefault: z.boolean(),
    id: z.number(),
    slug: z.string(),
    permissions: z.array(z.string())
})

export const UserSchema = z.object({
    id: z.number(),
    uuid: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    token: z.string(),
    userType: z.enum(['student', 'superadmin']),
    authProvider: z.string().optional(),
    avatarPath: z.string().optional(),
    isEmailVerified: z.boolean(),
    role: RoleSchema
})

export type UserT = z.infer<typeof UserSchema>
