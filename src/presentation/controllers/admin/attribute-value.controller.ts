import { AppLogger } from "../../../config/appLogger";
import { AddAttributeValueDto, UpdateAttributeValueDto, DeleteAttributeValueDto } from "../../../domain/dtos/attributeValues";
import { CustomError } from "../../../domain/errors/custom.error";
import { AttributeValueRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddAttributeValue } from "../../../domain/usecases/attributeValues/add-attribute-value.usecase";
import { DeleteAttributeValue } from "../../../domain/usecases/attributeValues/delete-attribute-value.usecase";
import { GetAttributeValues } from "../../../domain/usecases/attributeValues/get-attribute-value.usecase";
import { UpdateAttributeValue } from "../../../domain/usecases/attributeValues/update-attribute-value.usecase";

export class AttributeValueController {

     logger: AppLogger;

     constructor(private readonly attributeValueRepository: AttributeValueRepository) {
          this.logger = new AppLogger("AttributeValueController");
     }

     addAttributeValue = async (req: any, res: any) => {
          const [error, addAttributeValueDto] = AddAttributeValueDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddAttributeValue(this.attributeValueRepository)
               .execute(addAttributeValueDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateAttributeValue = async (req: any, res: any) => {
          const [error, updateAttributeValueDto] = UpdateAttributeValueDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateAttributeValue(this.attributeValueRepository)
               .execute(updateAttributeValueDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteAttributeValue = async (req: any, res: any) => {
          try {
               const [error, deleteAttributeValueDto] = DeleteAttributeValueDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteAttributeValue(this.attributeValueRepository)
                    .execute(deleteAttributeValueDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getAttributeValues = async (req: any, res: any) => {
          try {
               const data = await new GetAttributeValues(this.attributeValueRepository).execute();
               return res.json({ ...data, data: data.data.attributeValues });
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
