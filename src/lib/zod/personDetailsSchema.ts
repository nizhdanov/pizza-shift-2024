import { z } from 'zod';

import {
  ERR_MSG_INVALID_NAME,
  ERR_MSG_INVALID_PHONE,
  ERR_MSG_IVALID_EMAIL,
  ERR_MSG_REQUIRED
} from '@constants/errorMessages';

export const personDetailsSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: ERR_MSG_REQUIRED })
    .regex(/^(?:(?:[a-zA-Z]+(?:[' -]?[a-zA-Z]+)*)|(?:[а-яА-ЯёЁ]+(?:[' -]?[а-яА-ЯёЁ]+)*))$/, {
      message: ERR_MSG_INVALID_NAME
    }),
  lastname: z
    .string()
    .min(1, { message: ERR_MSG_REQUIRED })
    .regex(/^(?:(?:[a-zA-Z]+(?:[' -]?[a-zA-Z]+)*)|(?:[а-яА-ЯёЁ]+(?:[' -]?[а-яА-ЯёЁ]+)*))$/, {
      message: ERR_MSG_INVALID_NAME
    }),
  phone: z
    .string()
    .min(1, { message: ERR_MSG_REQUIRED })
    .regex(/^\+7 \d{3} \d{3} \d{2} \d{2}$/, { message: ERR_MSG_INVALID_PHONE }),
  email: z.string().min(1, { message: ERR_MSG_REQUIRED }).email({ message: ERR_MSG_IVALID_EMAIL })
});
