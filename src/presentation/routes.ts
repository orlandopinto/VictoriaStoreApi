import { Router } from "express";
import { AuthorizationRoutes, AuthRoutes } from "./auth/auth-routes";
import { RolesRoutes } from "./roles-permissions/routes/roles.routes";
import { ResoursesRoutes } from "./roles-permissions/routes/resourses.routes";
import { ActionsRoutes } from "./roles-permissions/routes/actions.routes";
import { PermissionsByRolesRoutes } from "./roles-permissions/routes/permissions-by-role.routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)
          router.use('/api/roles', RolesRoutes.routes)
          router.use('/api/resourses', ResoursesRoutes.routes)
          router.use('/api/actions', ActionsRoutes.routes)
          router.use('/api/permissionsyrole', PermissionsByRolesRoutes.routes)

          return router;
     }
}