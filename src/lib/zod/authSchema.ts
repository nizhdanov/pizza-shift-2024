import { z } from 'zod';

import {
  ERR_MSG_INVALID_OTP,
  ERR_MSG_INVALID_PHONE,
  ERR_MSG_REQUIRED
} from '@constants/errorMessages';

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, { message: ERR_MSG_REQUIRED })
    .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, { message: ERR_MSG_INVALID_PHONE })
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, { message: ERR_MSG_REQUIRED })
    .regex(/^\d{3} \d{3}$/, { message: ERR_MSG_INVALID_OTP })
});
