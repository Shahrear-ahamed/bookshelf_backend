import express from 'express'

import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.put('/add-wishlist', auth, UserController.addWishlist)

router.put(
  '/reading-list',
  auth,
  validateRequest(UserValidation.userAddReadingZodSchema),
  UserController.addReadingList,
)

export const UserRoutes = router
