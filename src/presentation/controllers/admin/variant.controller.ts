import { AppLogger } from "../../../config/appLogger";
import { AddVariant, UpdateVariant, DeleteVariant, GetVariants } from "../../../domain";
import { AddVariantDto, UpdateVariantDto, DeleteVariantDto } from "../../../domain/dtos/variants";
import { CustomError } from "../../../domain/errors/custom.error";
import { VariantRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class VariantController {

     logger: AppLogger;

     constructor(private readonly variantRepository: VariantRepository) {
          this.logger = new AppLogger("VariantController");
     }

     addVariant = async (req: any, res: any) => {
          const [error, addVariantDto] = AddVariantDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddVariant(this.variantRepository)
               .execute(addVariantDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateVariant = async (req: any, res: any) => {
          const [error, updateVariantDto] = UpdateVariantDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateVariant(this.variantRepository)
               .execute(updateVariantDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteVariant = async (req: any, res: any) => {
          try {
               const [error, deleteVariantDto] = DeleteVariantDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteVariant(this.variantRepository)
                    .execute(deleteVariantDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getVariants = async (req: any, res: any) => {
          try {
               const data = await new GetVariants(this.variantRepository).execute();
               return res.json({ ...data, data: data.data.variants });
          } catch (error) {
               this.handleCustomError(error as Error, res);
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          this.logger.Error(error as Error);
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    hasError: true,
                    message: error.message,
                    stackTrace: null,
                    status: "error",
                    statusCode: error.statusCode,
                    data: null
               }
               return res.status(error.statusCode).json(responsError)
          }
          return res.status(500).json({ error: 'Internal Server Error' })
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
