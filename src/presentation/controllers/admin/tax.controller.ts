import { AppLogger } from "../../../config/appLogger";
import { GetTaxesDto } from "../../../domain/dtos/taxes/get-taxes.dto";
import { TaxRepository } from "../../../domain/repositories";
import { ApiResultResponse } from '../../../domain/types/api-result-response.type';
import { GetTaxes } from "../../../domain/usecases/taxes/get-taxes.dto";

export class TaxController {

     logger: AppLogger;

     constructor(private readonly taxRepository: TaxRepository) {
          this.logger = new AppLogger("TaxController");
     }

     getTaxes = (req: any, res: any) => {
          try {
               const [error] = GetTaxesDto.get(req.body);
               if (error) return this.handleError(error, res);

               new GetTaxes(this.taxRepository)
                    .execute()
                    .then((data) => {
                         //NOTE: Asignar objeto.data para que lo devuelva a la api como data
                         data.data = data.data.taxes
                         return res.json(data)
                    })
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

     handleError = (error: string, res: any) => {
          if (error) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error as string,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}