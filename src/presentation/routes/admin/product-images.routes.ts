import { Router } from "express";
import { ProductImageRepositoryImpl } from "../../../infrastructure/repositories";
import { ProductImageController } from "../../controllers/admin/product-images.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { ProductImageDatasourceImpl } from "../../../infrastructure/datasources";

export class ProductImageRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ProductImageDatasourceImpl();
          const productimageRepository = new ProductImageRepositoryImpl(datasource)
          const controller = new ProductImageController(productimageRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addProductImage);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteProductImage);
          router.get('/', [AuthMiddleware.validateJWT], controller.getProductImages);

          return router;
     }
}
