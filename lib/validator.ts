import {z} from 'zod';

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Name must be between 4 and 64 characters long.',
    })
    .max(64, {
      message: 'Name must be between 4 and 64 characters long.',
    }),
  email: z.string().email({
    message: 'Email address must be a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Your password must contain 8 or more characters.',
    })
    .max(72, {
      message: 'Your password must contain less than 72 characters.',
    }),
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Email address must be a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Your password must contain 8 or more characters.',
    })
    .max(72, {
      message: 'Your password must contain less than 72 characters.',
    }),
});
