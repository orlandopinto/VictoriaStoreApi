import { PermissionsByRoleModel } from "../../data/mongodb";
import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto, DeletePermissionsByRoleDto } from "../../domain/dtos/roles-permissions";
import { DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
import { PermissionsByRoleMapper } from "../mappers";

export class PermissionsByRoleDatasourceImpl implements PermissionsByRoleDatasource {

     async addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<any> {
          const { permissionId, roleName, resourseName, permissionActionsIds } = addPermissionsByRoleDto;
          try {
               // 1. Crear el permissionsByRole
               const permissionsByRole = await PermissionsByRoleModel.create({ permissionId, roleName, resourseName, permissionActionsIds })
               await permissionsByRole.save();

               // 2. Mapear la respuesta a la entidad
               return PermissionsByRoleMapper.addPermissionsByRoleEntityFromObject(permissionsByRole);

          } catch (error) {
               throw error;
          }
     }

     async deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<any> {
          let { roleName, resourseName, hasError, message } = deletePermissionsByRoleDto;
          hasError = true;
          message = "No hay permissionsByRole que coincida con la consulta. Se eliminaron 0 permissionsByRoles."
          try {
               // 1. eliminar el permissionsByRole
               const result = await PermissionsByRoleModel.deleteMany({ roleName, resourseName })

               if (result.deletedCount > 0) {
                    hasError = false;
                    message = "PermissionsByRole deleted successfully.";
               }

               // 2. Mapear la respuesta a la entidad
               return PermissionsByRoleMapper.deletePermissionsByRoleEntityFromObject({ roleName, resourseName, hasError, message });

          } catch (error) {
               throw error;
          }
     }

     async getPermissionsByRoles(): Promise<GetPermissionsByRoleEntity> {
          try {
               // 1. listar
               const result = await PermissionsByRoleModel.find()
               // 2. Mapear la respuesta a la entidad
               return PermissionsByRoleMapper.getPermissionsByRoleListEntityFromObject({ permissionsByRoles: result, message: "" });

          } catch (error) {
               throw error;
          }
     }

}