import { z } from 'zod';

export const personDetailsSchema = z.object({
  firstname: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
  lastname: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
  phone: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
  email: z.string(),
  address: z.string().min(1, { message: 'Поле обязательно для заполнения' })
});
