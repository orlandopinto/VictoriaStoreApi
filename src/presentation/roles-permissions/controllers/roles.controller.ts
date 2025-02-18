import { RolesModel } from "../../../data/mongodb/models/roles.model";
import { AddRoleDto, DeleteRoleDto } from "../../../domain/dtos/roles-permissions";
import { CustomError } from "../../../domain/errors/custom.error";
import { RolesRepository } from "../../../domain/repositories/roles.repository";
import { ApiResultResponse } from '../../../domain/types/api-result-response.type';
import { AddRole } from "../../../domain/usecases/roles-permissions/add-role.usecase";
import { DeleteRole } from "../../../domain/usecases/roles-permissions/delete-role.usecase";

export class RoleController {

     constructor(private readonly rolesRepository: RolesRepository) { }

     addRole = (req: any, res: any) => {
          const [error, addRoleDto] = AddRoleDto.create(req.body);
          if (error) return this.handleError(error, res);

          new AddRole(this.rolesRepository)
               .execute(addRoleDto!)
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
               console.log('error: ', error)
          }
     }

     getRoles = (req: any, res: any) => {
          try {
               //TODO: Corregir la siguiente linea, esta buscando por model en vez del reposiorio
               RolesModel.find()
                    .then(data => res.json({ data }))
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