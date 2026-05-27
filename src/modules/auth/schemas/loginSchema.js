import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(100, 'Email too long'),
  
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long'),
  
  loginType: z.string().optional().default('user'),
  
  rememberMe: z.boolean().optional().default(false),
});

export const mobileSchema = z.object({
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
});
