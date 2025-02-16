import { Router } from "express";
import { AuthRoutes } from "./auth/auth-routes";
import { ActionsRoutes } from "./roles-permissions/routes/actions.routes";
import { ResoursesRoutes } from "./roles-permissions/routes/resourses.routes";
import { RolesRoutes } from "./roles-permissions/routes/roles.routes";
import { AuthorizationRoutes } from "./roles-permissions/routes/authorization.routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthRoutes.routes)

          router.use('/api/actions', ActionsRoutes.routes)
          router.use('/api/authorization', AuthorizationRoutes.routes)
          router.use('/api/resourses', ResoursesRoutes.routes)
          router.use('/api/roles', RolesRoutes.routes)

          return router;
     }
}