import { Router } from "express";
import { ActionsRepositoryImpl } from "../../../infrastructure";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { ActionController } from "../controllers/actions.controller";
import { ActionDatasourceImpl } from "../../../infrastructure/datasources";

export class ActionsRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ActionDatasourceImpl();
          const actionRepository = new ActionsRepositoryImpl(datasource)
          const controller = new ActionController(actionRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAction);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAction);
          router.get('/', [AuthMiddleware.validateJWT], controller.getActions);

          return router;
     }
}