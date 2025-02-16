import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import AuthMiddleware from "../middlewares/auth.middleware";
import { AuthController } from "./controller";

export class AuthorizationRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AuthDatasourceImpl();
          const authRepository = new AuthRepositoryImpl(datasource)
          const controller = new AuthController(authRepository);

          router.post('/signin', controller.signIn);
          router.post('/signup', controller.signUp);
          router.get('/', [AuthMiddleware.validateJWT], controller.getSystemUsers)

          return router;
     }
}