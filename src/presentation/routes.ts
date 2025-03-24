import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { AuthorizationRoutes } from "./auth/authorization.routes";
import { ActionRoutes } from './permissions/routes/action.routes';
import { CategoryRoutes } from "./permissions/routes/category.routes";
import { CloudinaryRoutes } from "./permissions/routes/cloudinary.routes";
import { PageRoutes } from "./permissions/routes/page.routes";
import { PermissionsByRoleRoutes } from "./permissions/routes/permissions-by-role.routes";
import { RoleRoutes } from "./permissions/routes/role.routes";
import { SubCategoryRoutes } from "./permissions/routes/sub-category.routes";

export class AppRoutes {

     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)

          router.use('/api/actions', ActionRoutes.routes)
          router.use('/api/permissions', PermissionsByRoleRoutes.routes)
          router.use('/api/pages', PageRoutes.routes)
          router.use('/api/roles', RoleRoutes.routes)
          router.use('/api/upload', CloudinaryRoutes.routes)

          router.use('/api/category', CategoryRoutes.routes)
          router.use('/api/sub-category', SubCategoryRoutes.routes)

          return router;
     }

}