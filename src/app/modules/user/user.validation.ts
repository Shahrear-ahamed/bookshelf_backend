import { z } from 'zod'

const userAddReadingZodSchema = z.object({
  body: z.object({
    bookId: z.string(),
    status: z.string(),
  }),
})

export const UserValidation = {
  userAddReadingZodSchema,
}
