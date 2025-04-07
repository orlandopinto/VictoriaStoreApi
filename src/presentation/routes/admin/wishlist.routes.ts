import { Router } from "express";
import { WishListDatasourceImpl } from "../../../infrastructure/datasources";
import { WishListRepositoryImpl } from "../../../infrastructure/repositories";
import { WishListController } from "../../controllers/admin/wishlist.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class WishListRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new WishListDatasourceImpl();
          const wishlistRepository = new WishListRepositoryImpl(datasource)
          const controller = new WishListController(wishlistRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addWishList);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateWishList);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteWishList);
          router.get('/', [AuthMiddleware.validateJWT], controller.getWishLists);

          return router;
     }
}
