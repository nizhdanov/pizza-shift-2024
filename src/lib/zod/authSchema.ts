import { z } from 'zod';

import { ERR_MSG_INVALID_PHONE, ERR_MSG_REQUIRED } from '@constants/errorMessages';

export const authSchema = z.object({
  phone: z
    .string()
    .min(1, { message: ERR_MSG_REQUIRED })
    .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, { message: ERR_MSG_INVALID_PHONE }),
  otp: z.string()
});
