import { PermissionsByRoleModel, permissionsByRoleSchema } from "../../data/mongodb";
import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
import { CustomError } from '../../domain/errors/custom.error';

export class PermissionsByRoleDatasourceImpl implements PermissionsByRoleDatasource {

     async addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity> {

          let { id, roleId, roleName, resourseId, resourseName, actionId, actionName } = addPermissionsByRoleDto;
          try {
               // 1. Verificar si existe el role
               const exists = await PermissionsByRoleModel.findOne({ id: id })
               if (exists) throw CustomError.badRequest('Permission already exists.')

               // 2. Crear el permissionsByRole
               const permissionsByRole = await PermissionsByRoleModel.create({ id, roleId, roleName, resourseId, resourseName, actionId, actionName })
               await permissionsByRole.save();

               return new AddPermissionsByRoleEntity(permissionsByRole.id, roleId, roleName, resourseId, resourseName, actionId, actionName);

          } catch (error) {
               throw error;
          }

     }

     async deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<DeletePermissionsByRoleEntity> {
          let { id } = deletePermissionsByRoleDto;
          try {
               const exists = await PermissionsByRoleModel.findOne({ id })
               if (!exists) throw CustomError.badRequest("The id does not exist or has been deleted. [0] records deleted")

               await PermissionsByRoleModel.deleteOne({ id });

               return new DeletePermissionsByRoleEntity(id);

          } catch (error) {
               throw error;
          }
     }

     async getPermissionsByRole(): Promise<GetPermissionsByRoleEntity> {
          try {
               const permissionsByRole = await PermissionsByRoleModel.find().lean() as unknown as [typeof permissionsByRoleSchema][]

               return new GetPermissionsByRoleEntity(permissionsByRole);

          } catch (error) {
               throw error;
          }
     }

}