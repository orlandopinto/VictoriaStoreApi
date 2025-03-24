import { Router } from "express";
import { SubCategoryDatasourceImpl } from "../../../infrastructure/datasources/sub-category.datasource.impl";
import { SubCategoryRepositoryImpl } from "../../../infrastructure/repositories/sub-category.repository.impl";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { SubCategoryController } from "../controllers/sub-category.controller";

export class SubCategoryRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new SubCategoryDatasourceImpl();
          const actionRepository = new SubCategoryRepositoryImpl(datasource)
          const controller = new SubCategoryController(actionRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addSubCategory);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateSubCategory);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteSubCategory);
          router.get('/', [AuthMiddleware.validateJWT], controller.getSubCategories);

          return router;
     }
}