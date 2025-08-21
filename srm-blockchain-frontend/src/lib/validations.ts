import { z } from 'zod';

// TODO: Add more specific messages in Spanish

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const PrescriptionCreateSchema = z.object({
  patientId: z.string().uuid(),
  medications: z.array(z.object({
    medicationId: z.string().uuid(),
    dosage: z.string().min(1),
    quantity: z.number().min(1),
  })).min(1),
  instructions: z.string().optional(),
});

export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['doctor', 'patient', 'pharmacist']),
  // Add more fields as needed
});
