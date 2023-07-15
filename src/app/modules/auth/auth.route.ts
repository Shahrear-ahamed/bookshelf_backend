import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = express.Router()

// create user
router.post(
  '/signup',
  validateRequest(AuthValidation.authSignUpZodSchema),
  AuthController.authSignUp,
)

// login user
router.post(
  '/login',
  validateRequest(AuthValidation.authLoginZodSchema),
  AuthController.authLogin,
)

export const AuthRoutes = router
