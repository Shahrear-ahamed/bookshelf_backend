import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BookRoutes } from '../modules/book/book.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const routerModules = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
]

routerModules.forEach(module => {
  router.use(module.path, module.route)
})

export default router
