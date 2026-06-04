import { z } from 'zod';

const AddressSchema = z.object({
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    company: z.string(),
    country: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    mobileNumber: z.string(),
    state: z.string(),
    zipcode: z.string(),
}).strict();

export const UserSchema = z.object({
    birthDay: z.string(),
    birthMonth: z.string(),
    birthYear: z.string(),
    email: z.email(),
    name: z.string().describe('Full display name'),
    password: z.string().min(5, 'Password must be at least 5 characters long'),
    title: z.enum(['Mr', 'Mrs']),
}).extend(AddressSchema.shape).strict();

export type User = z.infer<typeof UserSchema>;
