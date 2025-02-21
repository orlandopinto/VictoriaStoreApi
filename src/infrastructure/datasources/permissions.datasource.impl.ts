import { PermissionsModel, permissionsSchema } from "../../data/mongodb";
import { PermissionsDatasource } from "../../domain/datasources";
import { AddPermissionsDto, DeletePermissionsDto, GetPermissionsDto } from "../../domain/dtos/permissions";
import { AddPermissionsEntity, DeletePermissionsEntity, GetPermissionsEntity } from "../../domain/entities";
import { CustomError } from '../../domain/errors/custom.error';

export class PermissionsDatasourceImpl implements PermissionsDatasource {

     async addPermissions(addPermissionsDto: AddPermissionsDto): Promise<AddPermissionsEntity> {

          let { id, roleId, roleName, resourseId, resourseName, actionId, actionName } = addPermissionsDto;
          try {
               // 1. Verificar si existe el role
               const exists = await PermissionsModel.findOne({ id: id })
               if (exists) throw CustomError.badRequest('Permission already exists.')

               // 2. Crear el permissions
               const permissions = await PermissionsModel.create({ id, roleId, roleName, resourseId, resourseName, actionId, actionName })
               await permissions.save();

               return new AddPermissionsEntity(permissions.id, roleId, roleName, resourseId, resourseName, actionId, actionName);

          } catch (error) {
               throw error;
          }

     }

     async deletePermissions(deletePermissionsDto: DeletePermissionsDto): Promise<DeletePermissionsEntity> {
          let { id } = deletePermissionsDto;
          try {
               const exists = await PermissionsModel.findOne({ id })
               if (!exists) throw CustomError.badRequest("The id does not exist or has been deleted. [0] records deleted")

               await PermissionsModel.deleteOne({ id });

               return new DeletePermissionsEntity(id);

          } catch (error) {
               throw error;
          }
     }

     async getPermissions(): Promise<GetPermissionsEntity> {
          try {
               const permissions = await PermissionsModel.find() as unknown as [typeof permissionsSchema][]

               return new GetPermissionsEntity(permissions);

          } catch (error) {
               throw error;
          }
     }

}