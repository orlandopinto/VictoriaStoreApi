import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { PageController } from "../../controllers/permissions/page.controller";
import { PageRepositoryImpl } from "../../../infrastructure/repositories";
import { PageDatasourceImpl } from "../../../infrastructure/datasources";

export class PageRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new PageDatasourceImpl();
          const pageRepository = new PageRepositoryImpl(datasource)
          const controller = new PageController(pageRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addPage);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deletePage);
          router.get('/', [AuthMiddleware.validateJWT], controller.getPages);

          return router;
     }
}