import { Router } from "express";
import { AccessRepositoryImpl } from "../../../infrastructure";
import { AccessDatasourceImpl } from "../../../infrastructure/datasources";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { AccessController } from "../controllers/access.controller";

export class AccessRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AccessDatasourceImpl();
          const accessRepository = new AccessRepositoryImpl(datasource)
          const controller = new AccessController(accessRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAccess);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAccess);
          router.get('/', [AuthMiddleware.validateJWT], controller.getAccesss);

          return router;
     }
}