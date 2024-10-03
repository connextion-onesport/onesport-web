import {z} from 'zod';

export const emailFormSchema = z.object({
  email: z.string().email({
    message: 'Alamat email harus valid.',
  }),
});

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Nama harus terdiri dari 4 hingga 64 karakter.',
    })
    .max(64, {
      message: 'Nama harus terdiri dari 4 hingga 64 karakter.',
    }),
  email: z.string().email({
    message: 'Alamat email harus valid.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Kata sandi harus minimal 8 karakter.',
    })
    .max(72, {
      message: 'Kata sandi tidak boleh lebih dari 72 karakter.',
    }),
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Alamat email harus valid.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Kata sandi harus minimal 8 karakter.',
    })
    .max(72, {
      message: 'Kata sandi tidak boleh lebih dari 72 karakter.',
    }),
});

export const paymentFormSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Nama harus terdiri dari 4 hingga 64 karakter.',
    })
    .max(64, {
      message: 'Nama harus terdiri dari 4 hingga 64 karakter.',
    }),
  email: z.string().email({
    message: 'Alamat email harus valid.',
  }),
  phone: z.string().min(10, {
    message: 'Nomor telepon harus valid dan minimal 10 digit.',
  }),
  isSelf: z.boolean(),
  otherName: z
    .string()
    .min(4, {
      message: 'Nama harus terdiri dari 4 hingga 64 karakter.',
    })
    .max(64, {
      message: 'Nama harus terdiri dari 4 hingga 64 karakter.',
    })
    .optional(),
});

export const voucherFormSchema = z.object({
  voucher: z.string().min(4, {
    message: 'Kode voucher harus minimal 4 karakter.',
  }),
});
