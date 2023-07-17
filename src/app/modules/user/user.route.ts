import express from 'express'

import auth from '../../middlewares/auth'
import { UserController } from './user.controller'

const router = express.Router()

router.put('/add-wishlist', auth, UserController.addWishlist)

export const UserRoutes = router
