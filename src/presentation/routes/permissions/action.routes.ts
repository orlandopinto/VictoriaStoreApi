import { Router } from "express";
import { ActionRepositoryImpl } from "../../../infrastructure/repositories";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { ActionController } from "../../controllers/permissions/action.controller";
import { ActionDatasourceImpl } from "../../../infrastructure/datasources";

export class ActionRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ActionDatasourceImpl();
          const actionRepository = new ActionRepositoryImpl(datasource)
          const controller = new ActionController(actionRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAction);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAction);
          router.get('/', [AuthMiddleware.validateJWT], controller.getActions);

          return router;
     }
}