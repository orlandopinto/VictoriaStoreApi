import { Router } from "express";
import { SubCategoryDatasourceImpl } from "../../../infrastructure/datasources/sub-category.datasource.impl";
import { SubCategoryRepositoryImpl } from "../../../infrastructure/repositories/sub-category.repository.impl";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { SubCategoryController } from "../../controllers/admin/sub-category.controller";

export class SubCategoryRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new SubCategoryDatasourceImpl();
          const subCategoryRepository = new SubCategoryRepositoryImpl(datasource)
          const controller = new SubCategoryController(subCategoryRepository);

          router.post('/', [AuthMiddleware.validateJWT], controller.addSubCategory);
          router.put('/', [AuthMiddleware.validateJWT], controller.updateSubCategory);
          router.delete('/', [AuthMiddleware.validateJWT], controller.deleteSubCategory);
          router.get('/', [AuthMiddleware.validateJWT], controller.getSubCategories);

          return router;
     }
}