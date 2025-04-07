import { Router } from "express";
import { VariantDatasourceImpl } from "../../../infrastructure/datasources";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { VariantRepositoryImpl } from "../../../infrastructure/repositories/variant.repository.impl";
import { VariantController } from "../../controllers/admin/variant.controller";

export class VariantRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new VariantDatasourceImpl();
          const variantRepository = new VariantRepositoryImpl(datasource)
          const controller = new VariantController(variantRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addVariant);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateVariant);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteVariant);
          router.get('/', [AuthMiddleware.validateJWT], controller.getVariants);

          return router;
     }
}
