import { z } from 'zod';

export const tiersRequestSchema = z.object({
  name: z.string().min(5).max(128),
  order: z.coerce.number().min(0).max(10000000),
  price: z.coerce.number().min(1).max(10000000),
  duration: z.coerce.number().min(1).max(10000000),
  coins_rewarded: z.coerce.number().min(1),
});

export type TiersRequestSchema = z.infer<typeof tiersRequestSchema>;
