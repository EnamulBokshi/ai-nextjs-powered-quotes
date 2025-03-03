import {z} from 'zod';

export const usenameValidation = z
        .string()
        .min(3,"Username must be at least 3 characters long")
        .max(20,"Username must be at most 20 characters long")
        .regex(/^[a-zA-Z0-9_]*$/,"Username must contain only letters, numbers and underscores")

export const emailValidation = z
    .string()
    .email({message:"Invalid email address"})
export const passwordValidation = z.string().min(8,"Password must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")

export const signUpSchema = z.object({
    username: usenameValidation,
    email: emailValidation,
    password: passwordValidation
})
