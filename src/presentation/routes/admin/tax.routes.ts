import { Router } from "express";
import { TaxDatasourceImpl } from "../../../infrastructure/datasources/tax.datasource.impl";
import { TaxRepositoryImpl } from "../../../infrastructure/repositories/tax.repository.impl";
import AuthMiddleware from "../../middlewares/auth.middleware";
import { TaxController } from "../../controllers/admin/tax.controller";

export class TaxRoutes {

     static get routes(): Router {

          const router = Router();

          const datasource = new TaxDatasourceImpl();
          const taxRepository = new TaxRepositoryImpl(datasource)
          const controller = new TaxController(taxRepository);

          router.get('/', [AuthMiddleware.validateJWT], controller.getTaxes);

          return router;
     }
}