import { AddPermissionsByRole, GetPermissionsByRole, UpdatePermissionsByRole } from "../../../domain";
import { AddPermissionsByRoleDto, GetPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../../../domain/dtos/permissions";
import { CustomError } from "../../../domain/errors/custom.error";
import { PermissionsByRoleRepository } from "../../../domain/repositories";
import { ApiResultResponse } from "../../../domain/types";

export class PermissionsByRoleController {

     constructor(private readonly permissionsByRoleRepository: PermissionsByRoleRepository) { }

     addPermissionsByRole = (req: any, res: any) => {
          const [error, addPermissionsByRoleDto] = AddPermissionsByRoleDto.create(req.body);
          if (error) return this.handleError(error, res);

          new AddPermissionsByRole(this.permissionsByRoleRepository)
               .execute(addPermissionsByRoleDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updatePermissionsByRole = (req: any, res: any) => {
          const [error, updatePermissionsByRoleDto] = UpdatePermissionsByRoleDto.create(req.body);
          if (error) return this.handleError(error, res);

          new UpdatePermissionsByRole(this.permissionsByRoleRepository)
               .execute(updatePermissionsByRoleDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     getPermissionsByRole = (req: any, res: any) => {
          try {
               const [error] = GetPermissionsByRoleDto.get(req.body);
               if (error) return res.status(400).json({ error });

               new GetPermissionsByRole(this.permissionsByRoleRepository)
                    .execute()
                    .then((data) => {
                         //NOTE: Asignar objeto.data para que lo devuelva a la api como data
                         data.data = data.data.permissionsProfile
                         return res.json(data)
                    })
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               console.log('error: ', error)
          }
     }

     private handleCustomError = (error: unknown, res: any) => {
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