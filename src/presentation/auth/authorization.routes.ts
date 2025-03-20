import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import AuthMiddleware from "../middlewares/auth.middleware";
import { AuthController } from "./auth.controller";

export class AuthorizationRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AuthDatasourceImpl();
          const authRepository = new AuthRepositoryImpl(datasource)
          const controller = new AuthController(authRepository);

          router.post('/signin', controller.signIn);
          router.post('/signup', [AuthMiddleware.validateJWT], controller.signUp);
          router.post('/change-password', [AuthMiddleware.validateJWT], controller.changePassword);
          router.put('/:id', [AuthMiddleware.validateJWT], controller.update);
          router.post('/refresh', controller.refreshToken)
          router.get('/', [AuthMiddleware.validateJWT], controller.getSystemUsers)
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteSystemUser)

          return router;
     }
}