import { z } from 'zod';

import { ERR_MSG_REQUIRED } from '@constants/errorMessages';

export const newAddressScheme = z.object({
  // cityStreetHouse: z.string().min(1, { message: ERR_MSG_REQUIRED }),
  apartament: z.string().min(1, { message: ERR_MSG_REQUIRED }),
  floor: z.string(),
  comment: z.string()
});
