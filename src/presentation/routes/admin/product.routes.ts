import { Router } from "express";

import { ProductController } from "../../controllers/admin/products.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { ProductRepositoryImpl } from "../../../infrastructure/repositories";
import { ProductDatasourceImpl } from "../../../infrastructure/datasources";

export class ProductRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ProductDatasourceImpl();
          const productRepository = new ProductRepositoryImpl(datasource)
          const controller = new ProductController(productRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addProduct);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateProduct);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteProduct);
          router.get('/', [AuthMiddleware.validateJWT], controller.getProducts);

          return router;
     }
}
