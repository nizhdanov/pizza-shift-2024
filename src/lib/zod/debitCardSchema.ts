import { z } from 'zod';

export const debitCardSchema = z.object({
  pan: z.string().regex(/\d{4} \d{4}/),
  expireDate: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().regex(/\d{4}/)
});
