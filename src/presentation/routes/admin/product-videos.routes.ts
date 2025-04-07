import { Router } from "express";
import { ProductVideoDatasourceImpl } from "../../../infrastructure/datasources";
import { ProductVideoRepositoryImpl } from "../../../infrastructure/repositories";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { ProductVideoController } from "../../controllers/admin/product-videos.controller";

export class ProductVideoRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ProductVideoDatasourceImpl();
          const productvideoRepository = new ProductVideoRepositoryImpl(datasource)
          const controller = new ProductVideoController(productvideoRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addProductVideo);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteProductVideo);
          router.get('/', [AuthMiddleware.validateJWT], controller.getProductVideos);

          return router;
     }
}
