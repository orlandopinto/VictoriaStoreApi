import { Router } from "express";
import { AttributeDatasourceImpl } from "../../../infrastructure/datasources";
import { AttributeRepositoryImpl } from "../../../infrastructure";
import { AttributeController } from "../../controllers/admin/attributes.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class AttributeRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AttributeDatasourceImpl();
          const attributeRepository = new AttributeRepositoryImpl(datasource)
          const controller = new AttributeController(attributeRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAttribute);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateAttribute);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAttribute);
          router.get('/', [AuthMiddleware.validateJWT], controller.getAttributes);

          return router;
     }
}