import { z } from 'zod'

const authSignUpZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be required' }).email(),
    password: z.string({ required_error: 'Password must be required' }).min(6),
  }),
})

const authLoginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email must be required' }).email(),
    password: z.string({ required_error: 'Password must be required' }).min(6),
  }),
})

export const AuthValidation = {
  authSignUpZodSchema,
  authLoginZodSchema,
}
