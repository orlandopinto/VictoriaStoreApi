import { RolesModel } from "../../data/mongodb/models/roles.model";
import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { AddRoleDto, DeleteRoleDto } from "../../domain/dtos/roles";
import { RolesEntity, DeleteRoleEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { RoleMapper } from "../mappers/roles.mapper";

export class RolesDatasourceImpl implements RoleDatasource {

     async addRole(addRoleDto: AddRoleDto): Promise<RolesEntity> {
          const { roleName } = addRoleDto;
          try {

               // 1. Verificar si existe el role
               const exists = await RolesModel.findOne({ roleName: roleName })
               if (exists) throw CustomError.badRequest('Role name already exists.')

               // 2. Crear el role
               const role = await RolesModel.create({ roleName: roleName })
               await role.save();

               // 3. Mapear la respuesta a la entidad
               return RoleMapper.roleEntityFromObject(role);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity> {
          const { roleName } = deleteRoleDto;
          let message: string = "No hay role que coincida con la consulta. Se eliminaron 0 roles."
          try {

               // 1. Verificar si existe el role
               const exists = await RolesModel.findOne({ roleName: roleName })
               if (!exists) throw CustomError.badRequest("The role name does not exist or has been deleted.")

               // 2. eliminar el role
               const result = await RolesModel.deleteOne({ roleName: roleName })

               if (result.deletedCount === 1) {
                    message = "Role deleted successfully.";
               }

               // 3. Mapear la respuesta a la entidad
               return RoleMapper.deleteRoleEntityFromObject({ roleName, message });

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}