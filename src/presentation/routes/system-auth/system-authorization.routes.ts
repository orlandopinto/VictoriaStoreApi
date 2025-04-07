import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { SystemAuthController } from "../../controllers/system-auth/system-auth.controller";
import { AuthDatasourceImpl } from "../../../infrastructure/datasources";
import { AuthRepositoryImpl } from "../../../infrastructure/repositories";

export class SystemAuthorizationRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AuthDatasourceImpl();
          const authRepository = new AuthRepositoryImpl(datasource)
          const controller = new SystemAuthController(authRepository);

          router.post('/signin', controller.signIn);
          router.post('/change-password', [AuthMiddleware.validateJWT], controller.changePassword);
          router.post('/refresh', controller.refreshToken)

          return router;
     }
}