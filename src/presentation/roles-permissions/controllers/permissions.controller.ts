import { AddPermissions } from "../../../domain";
import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../../../domain/dtos/roles-permissions";
import { CustomError } from "../../../domain/errors/custom.error";
import { PermissionsRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";
import { DeletePermissions } from "../../../domain/usecases/roles-permissions";
import { GetPermissions } from "../../../domain/usecases/roles-permissions/get-permissions.usecase";

export class PermissionsController {

     constructor(private readonly permissionsRepository: PermissionsRepository) { }

     addPermissions = (req: any, res: any) => {
          const [error, addPermissionsDto] = AddPermissionsDto.create(req.body);
          if (error) return this.handleError(error, res);

          new AddPermissions(this.permissionsRepository)
               .execute(addPermissionsDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deletePermissions = (req: any, res: any) => {
          try {
               const [error, deletePermissionsDto] = DeletePermissionsDto.delete(req.body);
               if (error) return this.handleError(error, res);

               new DeletePermissions(this.permissionsRepository)
                    .execute(deletePermissionsDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     getPermissions = (req: any, res: any) => {
          try {
               const [error, getPermissionsDto] = GetPermissionsDto.get(req.body);
               if (error) return res.status(400).json({ error });

               new GetPermissions(this.permissionsRepository)
                    .execute(getPermissionsDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
          if (error instanceof CustomError) {
               const responsError: ApiResultResponse = {
                    errorMessage: error.message,
                    hasError: true,
                    message: null,
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
                    errorMessage: error as string,
                    hasError: true,
                    message: null,
                    stackTrace: null,
                    status: "error",
                    statusCode: 400,
                    data: null
               }
               return res.status(400).json(responsError)
          }
     }

}