import {z} from 'zod';

const messageSchema = z.object({
    message: z.string().min(5,"Message must be at least 1 character long").max(300,{message:"Message must be at most 300 characters long"})
})