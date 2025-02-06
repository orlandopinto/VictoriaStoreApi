import { Router } from "express";
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import AuthMiddleware from "../middlewares/auth.middleware";
import { AuthController } from "./controller";

export class AuthRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AuthDatasourceImpl();
          const authRepository = new AuthRepositoryImpl(datasource)
          const controller = new AuthController(authRepository);

          router.post('/login', controller.loginUser);
          router.post('/register', controller.registerUser);
          router.get('/', [AuthMiddleware.validateJWT], controller.getUsers)

          return router;
     }
}

export class AuthorizationRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AuthDatasourceImpl();
          const authRepository = new AuthRepositoryImpl(datasource)
          const accountController = new AuthController(authRepository);

          router.post('/signin', accountController.signIn);
          router.post('/signup', accountController.signUp);
          router.get('/', [AuthMiddleware.validateJWT], accountController.getSystemUsers)

          return router;
     }
}