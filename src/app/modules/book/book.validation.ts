import { z } from 'zod'

const createBookZodSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  author: z.string({ required_error: 'Author is required' }),
  genre: z.string({ required_error: 'Genre is required' }),
  publicationDate: z
    .date({ required_error: 'Publication Date is required' })
    .optional(),
})

export const BookValidation = {
  createBookZodSchema,
}
