import { AppLogger } from "../../config/appLogger";
import { TaxesModel, taxesSchema } from "../../data/mongodb";
import { TaxDatasource } from "../../domain/datasources";
import { GetTaxesEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class TaxDatasourceImpl implements TaxDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("TaxDatasourceImpl");
     }

     async getTaxes(): Promise<GetTaxesEntity> {
          try {

               const taxes = await TaxesModel.find() as unknown as [typeof taxesSchema][]
               return new GetTaxesEntity(taxes);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError)
                    throw error;

               throw CustomError.internalServerError();
          }
     }

}