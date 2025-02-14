import { Router } from "express";
import { RolesDatasourceImpl } from "../../infrastructure/datasources/roles.datasource.impl";
import { RolesRepositoryImpl } from "../../infrastructure/repositories/roles.repository.impl";
import AuthMiddleware from "../middlewares/auth.middleware";
import { RoleController } from "./roles.controller";

export class RolesRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new RolesDatasourceImpl();
          const roleRepository = new RolesRepositoryImpl(datasource)
          const controller = new RoleController(roleRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addRole);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteRole);
          router.get('/', [AuthMiddleware.validateJWT], controller.getRoles);

          return router;
     }
}