import {z} from 'zod';

export const isAcceptingMessages = z.object({
    isAcceptingMessages: z.boolean()
})