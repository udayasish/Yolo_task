import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'), // Required field
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  gender: z.enum(['male', 'female', 'other']), // Required field
  description: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>