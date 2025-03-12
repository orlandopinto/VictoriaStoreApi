import { Router } from "express";
import { RoleDatasourceImpl } from "../../../infrastructure/datasources/role.datasource.impl";
import { RoleRepositoryImpl } from "../../../infrastructure/repositories/role.repository.impl";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { RoleController } from "../controllers/role.controller";

export class RoleRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new RoleDatasourceImpl();
          const roleRepository = new RoleRepositoryImpl(datasource)
          const controller = new RoleController(roleRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addRole);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateRole);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteRole);
          router.get('/', [AuthMiddleware.validateJWT], controller.getRoles);

          return router;
     }
}