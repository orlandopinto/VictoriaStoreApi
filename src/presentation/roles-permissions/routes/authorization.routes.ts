import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { AuthorizationRepositoryImpl } from "../../../infrastructure";
import { AuthorizationDatasourceImpl } from "../../../infrastructure/datasources";
import { AuthorizationController } from "../controllers/authorization.controller";

export class AuthorizationRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AuthorizationDatasourceImpl();
          const authorizationRepository = new AuthorizationRepositoryImpl(datasource)
          const controller = new AuthorizationController(authorizationRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAuthorization);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAuthorization);
          router.get('/', [AuthMiddleware.validateJWT], controller.getAuthorizations);

          return router;
     }
}