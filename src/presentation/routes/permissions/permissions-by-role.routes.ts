import { Router } from "express";
import { PermissionsByRoleRepositoryImpl } from "../../../infrastructure";
import { PermissionsByRoleDatasourceImpl } from "../../../infrastructure/datasources";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { PermissionsByRoleController } from "../../controllers/permissions/permissions-by-role.controller";

export class PermissionsByRoleRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new PermissionsByRoleDatasourceImpl();
          const permissionsRepository = new PermissionsByRoleRepositoryImpl(datasource)
          const controller = new PermissionsByRoleController(permissionsRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addPermissionsByRole);
          router.put('/', [AuthMiddleware.validateJWT], controller.updatePermissionsByRole);
          router.get('/', [AuthMiddleware.validateJWT], controller.getPermissionsByRole);

          return router;
     }
}