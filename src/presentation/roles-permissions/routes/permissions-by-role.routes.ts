import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { PermissionsByRolesRepositoryImpl } from "../../../infrastructure";
import { PermissionsByRoleDatasourceImpl } from "../../../infrastructure/datasources";
import { PermissionsByRoleController } from "../controllers/permissions-by-roles.controller";

export class PermissionsByRolesRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new PermissionsByRoleDatasourceImpl();
          const permissionsByRoleRepository = new PermissionsByRolesRepositoryImpl(datasource)
          const controller = new PermissionsByRoleController(permissionsByRoleRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addPermissionsByRole);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deletePermissionsByRole);
          router.get('/', [AuthMiddleware.validateJWT], controller.getPermissionsByRoles);

          return router;
     }
}