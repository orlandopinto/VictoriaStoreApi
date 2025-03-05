import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { AuthorizationRoutes } from "./auth/authorization.routes";
import { ActionRoutes } from './permissions/routes/action.routes';
import { PermissionsByRoleRoutes } from "./permissions/routes/permissions-by-role.routes";
import { PageRoutes } from "./permissions/routes/page.routes";
import { RoleRoutes } from "./permissions/routes/role.routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)

          router.use('/api/actions', ActionRoutes.routes)
          router.use('/api/permissions', PermissionsByRoleRoutes.routes)
          router.use('/api/pages', PageRoutes.routes)
          router.use('/api/roles', RoleRoutes.routes)

          return router;
     }
}