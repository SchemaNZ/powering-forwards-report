import { z } from 'zod';

export const reportLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  farmType: z.enum(['dairy', 'sheepBeef']).optional().or(z.literal('')),
  region: z.enum(['Southland', 'Otago', 'Canterbury', 'West Coast']).optional().or(z.literal('')),
  timeline: z.enum(['next-month', 'next-3-months', 'next-6-months', 'next-year', 'interested']).optional().or(z.literal('')),
});

export type ReportLead = z.infer<typeof reportLeadSchema>;
