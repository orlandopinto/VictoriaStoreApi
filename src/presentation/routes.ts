import { Router } from "express";
import { AuthorizationRoutes, AuthRoutes } from "./auth/auth-routes";
import { RolesRoutes } from "./roles/roles-routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/systemauth', AuthorizationRoutes.routes)
          router.use('/api/roles', RolesRoutes.routes)

          return router;
     }
}