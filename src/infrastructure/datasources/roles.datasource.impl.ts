import { RolesModel, rolesSchema } from "../../data/mongodb/models/roles.model";
import { RoleDatasource } from "../../domain/datasources/role.datasource";
import { AddRoleDto, DeleteRoleDto } from "../../domain/dtos/permissions";
import { DeleteRoleEntity, GetRolesEntity, AddRoleEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class RolesDatasourceImpl implements RoleDatasource {

     async addRole(addRoleDto: AddRoleDto): Promise<AddRoleEntity> {
          let { roleName, roleDescription } = addRoleDto;
          try {

               // 1. Verificar si existe el role
               const exists = await RolesModel.findOne({ roleName: roleName })
               if (exists) throw CustomError.badRequest('Role name already exists.')

               // 2. Crear el role
               const role = await RolesModel.create({ roleName, roleDescription })
               await role.save();

               return new AddRoleEntity(role.id, roleName, roleDescription);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async deleteRole(deleteRoleDto: DeleteRoleDto): Promise<DeleteRoleEntity> {
          let { roleName } = deleteRoleDto;
          try {
               const exists = await RolesModel.findOne({ roleName: roleName })
               if (!exists) throw CustomError.badRequest("The role name does not exist or has been deleted.")

               // 2. eliminar el role
               await RolesModel.deleteOne({ roleName: roleName })

               return new DeleteRoleEntity(roleName);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

     async getRoles(): Promise<GetRolesEntity> {
          try {

               const roles = await RolesModel.find() as unknown as [typeof rolesSchema][]

               return new GetRolesEntity(roles);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }

}