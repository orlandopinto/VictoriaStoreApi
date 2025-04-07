import { Router } from "express";
import { DiscountDatasourceImpl } from "../../../infrastructure/datasources";
import { DiscountRepositoryImpl } from "../../../infrastructure/repositories";
import { DiscountController } from "../../controllers/admin/discounts.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class DiscountsRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new DiscountDatasourceImpl();
          const discountRepository = new DiscountRepositoryImpl(datasource)
          const controller = new DiscountController(discountRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addDiscount);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateDiscount);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteDiscount);
          router.get('/', [AuthMiddleware.validateJWT], controller.getDiscounts);

          return router;
     }
}