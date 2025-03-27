import { AppLogger } from "../../../config/appLogger";
import { UpdateRole } from "../../../domain";
import { AddRoleDto, DeleteRoleDto, GetRolesDto, UpdateRoleDto } from "../../../domain/dtos/permissions";
import { CustomError } from "../../../domain/errors/custom.error";
import { RoleRepository } from "../../../domain/repositories/role.repository";
import { ApiResultResponse } from '../../../domain/types/api-result-response.type';
import { AddRole } from "../../../domain/usecases/permissions/add-role.usecase";
import { DeleteRole } from "../../../domain/usecases/permissions/delete-role.usecase";
import { GetRoles } from "../../../domain/usecases/permissions/get-roles.usecase";

export class RoleController {

     logger: AppLogger;

     constructor(private readonly rolesRepository: RoleRepository) {
          this.logger = new AppLogger("RoleController");
     }

     addRole = (req: any, res: any) => {
          const [error, addRoleDto] = AddRoleDto.create(req.body);
          if (error) return this.handleError(error, res);

          new AddRole(this.rolesRepository)
               .execute(addRoleDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     updateRole = (req: any, res: any) => {
          const [error, updateRoleDto] = UpdateRoleDto.create(req.body);
          if (error) return this.handleError(error, res);

          new UpdateRole(this.rolesRepository)
               .execute(updateRoleDto!)
               .then((data) => res.json(data))
               .catch(error => this.handleCustomError(error, res));
     }

     deleteRole = (req: any, res: any) => {
          try {
               const [error, deleteRoleDto] = DeleteRoleDto.delete(req.body);
               if (error) return this.handleError(error, res);

               new DeleteRole(this.rolesRepository)
                    .execute(deleteRoleDto!)
                    .then((data) => res.json(data))
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               this.logger.Error(error as Error);
          }
     }

     getRoles = (req: any, res: any) => {
          try {
               const [error] = GetRolesDto.get(req.body);
               if (error) return this.handleError(error, res);

               new GetRoles(this.rolesRepository)
                    .execute()
                    .then((data) => {
                         //NOTE: Asignar objeto.data para que lo devuelva a la api como data
                         data.data = data.data.roles
                         return res.json(data)
                    })
                    .catch(error => this.handleCustomError(error, res));
          } catch (error) {
               this.logger.Error(error as Error);
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