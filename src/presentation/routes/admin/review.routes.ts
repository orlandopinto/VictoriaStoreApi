import { Router } from "express";
import { ReviewDatasourceImpl } from "../../../infrastructure/datasources";
import { ReviewRepositoryImpl } from "../../../infrastructure/repositories/review.repository.impl";
import { ReviewController } from "../../controllers/admin/review.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

export class ReviewRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new ReviewDatasourceImpl();
          const reviewRepository = new ReviewRepositoryImpl(datasource)
          const controller = new ReviewController(reviewRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addReview);
          router.get('/', [AuthMiddleware.validateJWT], controller.getReviews);

          return router;
     }
}
