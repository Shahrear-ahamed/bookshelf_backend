import { z } from 'zod'

const userReadingZodSchema = z.object({
  body: z.object({
    book: z.string(),
    status: z.string(),
  }),
})

export const UserValidation = {
  userReadingZodSchema,
}
