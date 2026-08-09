import { email, z } from 'zod'

export const registerSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),

})


export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
});




export type RegisterSchema = z.infer<typeof registerSchema>;