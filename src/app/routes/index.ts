import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'

const router = express.Router()

const routerModules = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

routerModules.forEach(module => {
  router.use(module.path, module.route)
})

export default router
