import {z} from 'zod';

export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string()
})
// Compare this snippet from schemas/signUpSchema.ts: