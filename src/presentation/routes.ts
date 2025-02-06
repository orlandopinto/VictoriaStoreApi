import { Router } from "express";
import { AuthorizationRoutes, AuthRoutes } from "./auth/routes";

export class AppRoutes {
     static get routes(): Router {
          const router = Router();

          router.use('/api/auth', AuthRoutes.routes)
          router.use('/api/auth', AuthorizationRoutes.routes)

          return router;
     }
}