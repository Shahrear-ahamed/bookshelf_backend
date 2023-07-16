import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { bookRoutes } from '../modules/book/book.route'

const router = express.Router()

const routerModules = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
]

routerModules.forEach(module => {
  router.use(module.path, module.route)
})

export default router
