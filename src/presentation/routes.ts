import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { AuthorizationRoutes } from "./auth/authorization.routes";
import { ActionRoutes } from './routes/permissions/action.routes';
import { CategoryRoutes } from "./routes/admin/category.routes";
import { PermissionsByRoleRoutes } from "./routes/permissions/permissions-by-role.routes";
import { RoleRoutes } from "./routes/permissions/role.routes";
import { SubCategoryRoutes } from "./routes/admin/sub-category.routes";
import { TaxRoutes } from "./routes/admin/tax.routes";
import { CloudinaryRoutes } from "./routes/adpaters/cloudinary.routes";
import { PageRoutes } from "./routes/permissions/page.routes";

export class AppRoutes {

     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)

          router.use('/api/actions', ActionRoutes.routes)
          router.use('/api/permissions', PermissionsByRoleRoutes.routes)
          router.use('/api/pages', PageRoutes.routes)
          router.use('/api/roles', RoleRoutes.routes)
          router.use('/api/category', CategoryRoutes.routes)
          router.use('/api/sub-category', SubCategoryRoutes.routes)
          router.use('/api/taxes', TaxRoutes.routes)

          router.use('/api/upload', CloudinaryRoutes.routes)

          return router;
     }

}