import { Router } from "express";

import AuthMiddleware from "../../middlewares/auth.middleware";
import { RatingDatasourceImpl } from "../../../infrastructure/datasources/rating.datasource.impl";
import { RatingRepositoryImpl } from "../../../infrastructure/repositories/rating.repository.impl";
import { RatingController } from "../../controllers/admin/rating.controller";

export class RatingRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new RatingDatasourceImpl();
          const ratingRepository = new RatingRepositoryImpl(datasource)
          const controller = new RatingController(ratingRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addRating);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateRating);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteRating);
          router.get('/', [AuthMiddleware.validateJWT], controller.getRatings);

          return router;
     }
}
