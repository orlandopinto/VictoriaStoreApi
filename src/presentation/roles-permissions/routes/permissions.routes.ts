import { Router } from "express";
import { PermissionsRepositoryImpl } from "../../../infrastructure";
import { PermissionsDatasourceImpl } from "../../../infrastructure/datasources";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { PermissionsController } from "../controllers/permissions.controller";

export class PermissionsRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new PermissionsDatasourceImpl();
          const permissionsRepository = new PermissionsRepositoryImpl(datasource)
          const controller = new PermissionsController(permissionsRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addPermissions);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deletePermissions);
          router.get('/', [AuthMiddleware.validateJWT], controller.getPermissions);

          return router;
     }
}