import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { AuthorizationRoutes } from "./auth/authorization.routes";
import { ActionsRoutes } from './permissions/routes/actions.routes';
import { PermissionsByRoleRoutes } from "./permissions/routes/permissions-by-role.routes";
import { ResoursesRoutes } from "./permissions/routes/resourses.routes";
import { RolesRoutes } from "./permissions/routes/roles.routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)

          router.use('/api/actions', ActionsRoutes.routes)
          router.use('/api/permissions', PermissionsByRoleRoutes.routes)
          router.use('/api/resourses', ResoursesRoutes.routes)
          router.use('/api/roles', RolesRoutes.routes)

          return router;
     }
}