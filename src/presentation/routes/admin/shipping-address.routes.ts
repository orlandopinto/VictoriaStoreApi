import { Router } from "express";
import { ShippingAddressDatasourceImpl } from "../../../infrastructure/datasources";
import { ShippingAddressRepositoryImpl } from "../../../infrastructure";
import { ShippingAddressController } from "../../controllers/admin/shipping-address.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class ShippingAddressRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ShippingAddressDatasourceImpl();
          const shippingaddressRepository = new ShippingAddressRepositoryImpl(datasource)
          const controller = new ShippingAddressController(shippingaddressRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addShippingAddress);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateShippingAddress);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteShippingAddress);
          router.get('/', [AuthMiddleware.validateJWT], controller.getShippingAddresses);

          return router;
     }
}
