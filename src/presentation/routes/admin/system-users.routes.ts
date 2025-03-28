import { Router } from "express";
import { SystemUserRepositoryImpl } from "../../../infrastructure";
import { SystemUserController } from "../../controllers/admin/system-users.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { SystemUserDatasourceImpl } from "../../../infrastructure/datasources";

export class SystemUserRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new SystemUserDatasourceImpl();
          const systemuserRepository = new SystemUserRepositoryImpl(datasource)
          const controller = new SystemUserController(systemuserRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addSystemUser);
          router.put('/:id', [AuthMiddleware.validateJWT], controller.updateSystemUser);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteSystemUser);
          router.get('/', [AuthMiddleware.validateJWT], controller.getSystemUsers);

          return router;
     }
}
