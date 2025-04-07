import { Router } from "express";
import { SystemUserRepositoryImpl } from "../../../infrastructure/repositories";
import { SystemUserDatasourceImpl } from "../../../infrastructure/datasources";
import { SystemUserController } from "../../controllers/system-auth/system-users.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class SystemUserRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new SystemUserDatasourceImpl();
          const systemUserRepository = new SystemUserRepositoryImpl(datasource)
          const controller = new SystemUserController(systemUserRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addSystemUser);
          router.put('/:id', [AuthMiddleware.validateJWT], controller.updateSystemUser);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteSystemUser);
          router.get('/', [AuthMiddleware.validateJWT], controller.getSystemUsers);

          return router;
     }
}
