import { AppLogger } from "../../../config/appLogger";
import { AddAttributeDto } from "../../../domain/dtos/attributes/add-attribute.dto";
import { DeleteAttributeDto } from "../../../domain/dtos/attributes/delete-attribute.dto";
import { UpdateAttributeDto } from "../../../domain/dtos/attributes/update-attribute.dto";
import { CustomError } from "../../../domain/errors/custom.error";
import { AttributeRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { AddAttribute } from "../../../domain/usecases/attributes/add-attribute.usecase";
import { DeleteAttribute } from "../../../domain/usecases/attributes/delete-attribute.usecase";
import { GetAttributes } from "../../../domain/usecases/attributes/get-attributes.usecase";
import { UpdateAttribute } from "../../../domain/usecases/attributes/update-attribute.usecase";

export class AttributeController {

     logger: AppLogger;

     constructor(private readonly attributeRepository: AttributeRepository) {
          this.logger = new AppLogger("AttributeController");
     }

     addAttribute = async (req: any, res: any) => {
          const [error, addAttributeDto] = AddAttributeDto.create(req.body);
          if (error) return this.handleError(error, res);

          await new AddAttribute(this.attributeRepository)
               .execute(addAttributeDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateAttribute = async (req: any, res: any) => {
          const [error, updateAttributeDto] = UpdateAttributeDto.update(req.body);
          if (error) return this.handleError(error, res);

          await new UpdateAttribute(this.attributeRepository)
               .execute(updateAttributeDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteAttribute = async (req: any, res: any) => {
          try {
               const [error, deleteAttributeDto] = DeleteAttributeDto.delete(req.body);
               if (error) return this.handleError(error, res);

               await new DeleteAttribute(this.attributeRepository)
                    .execute(deleteAttributeDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleError(error, res));
          } catch (error) {
               this.handleCustomError(error, res);
          }
     }

     getAttributes = async (req: any, res: any) => {
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