import { AppLogger } from "../../../config/appLogger";
import { AddAttributeNameDto } from "../../../domain/dtos/attributeNames/add-attribute-name.dto";
import { DeleteAttributeNameDto } from "../../../domain/dtos/attributeNames/delete-attribute-name.dto";
import { UpdateAttributeNameDto } from "../../../domain/dtos/attributeNames/update-attribute-name.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { AttributeNamesRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddAttribute } from "../../../domain/usecases/attributes/add-attribute.usecase";
import { DeleteAttribute } from "../../../domain/usecases/attributes/delete-attribute.usecase";
import { GetAttributes } from "../../../domain/usecases/attributes/get-attributes.usecase";
import { UpdateAttribute } from "../../../domain/usecases/attributes/update-attribute.usecase";

export class AttributeNameController {

     logger: AppLogger;

     constructor(private readonly attributeRepository: AttributeNamesRepository) {
          this.logger = new AppLogger("AttributeNameController");
     }

     addAttributeName = async (req: any, res: any) => {
          const [error, addAttributeNameDto] = AddAttributeNameDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddAttribute(this.attributeRepository)
               .execute(addAttributeNameDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateAttributeName = async (req: any, res: any) => {
          const [error, updateAttributeNameDto] = UpdateAttributeNameDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateAttribute(this.attributeRepository)
               .execute(updateAttributeNameDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteAttribute = async (req: any, res: any) => {
          try {
               const [error, deleteAttributeNameDto] = DeleteAttributeNameDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteAttribute(this.attributeRepository)
                    .execute(deleteAttributeNameDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getAttributeNames = async (req: any, res: any) => {
          try {
               const data = await new GetAttributes(this.attributeRepository).execute();
               return res.json({ ...data, data: data.data.attributes });
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