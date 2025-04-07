import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { AttributeValueDatasourceImpl } from "../../../infrastructure/datasources";
import { AttributeValueRepositoryImpl } from "../../../infrastructure/repositories";
import { AttributeValueController } from "../../controllers/admin/attribute-value.controller";

export class AttributeValuesRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new AttributeValueDatasourceImpl();
          const attributeValueRepository = new AttributeValueRepositoryImpl(datasource)
          const controller = new AttributeValueController(attributeValueRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addAttributeValue);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateAttributeValue);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteAttributeValue);
          router.get('/', [AuthMiddleware.validateJWT], controller.getAttributeValues);

          return router;
     }
}
