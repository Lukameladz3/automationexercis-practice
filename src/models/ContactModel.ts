import { z } from 'zod';

export const ContactSchema = z.object({
    email: z.email(),
    message: z.string(),
    name: z.string().describe('Full display name'),
    subject: z.string(),
});

export type ContactData = z.infer<typeof ContactSchema>;
