import { Router } from "express";
import { AttributeNamesDatasourceImpl } from "../../../infrastructure/datasources";
import { AttributeNameRepositoryImpl } from "../../../infrastructure/repositories";
import { AttributeNameController } from "../../controllers/admin/attribute-names.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class AttributeNamesRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AttributeNamesDatasourceImpl();
          const attributeNameRepository = new AttributeNameRepositoryImpl(datasource)
          const controller = new AttributeNameController(attributeNameRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAttributeName);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateAttributeName);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAttribute);
          router.get('/', [AuthMiddleware.validateJWT], controller.getAttributeNames);

          return router;
     }
}