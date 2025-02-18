import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { AuthorizationRoutes } from "./auth/authorization.routes";
import { ActionsRoutes } from "./roles-permissions/routes/actions.routes";
import { ResoursesRoutes } from "./roles-permissions/routes/resourses.routes";
import { RolesRoutes } from "./roles-permissions/routes/roles.routes";
import { PermissionsRoutes } from "./roles-permissions/routes/permissions.routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)

          router.use('/api/actions', ActionsRoutes.routes)
          router.use('/api/permissions', PermissionsRoutes.routes)
          router.use('/api/resourses', ResoursesRoutes.routes)
          router.use('/api/roles', RolesRoutes.routes)

          return router;
     }
}