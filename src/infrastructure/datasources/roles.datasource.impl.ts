import { PermissionsByRoleModel, SystemUserModel } from "../../data/mongodb";
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
               let exists = await RolesModel.findOne({ roleName: roleName })
               if (!exists) throw CustomError.badRequest("The role name does not exist or has been deleted.")

               // 2. eliminar el role
               const roleDelete = await RolesModel.deleteOne({ roleName: roleName })
               //console.log('roleDelete: ', roleDelete)

               //3. Se buscan si existen permisos 
               let permisos = await PermissionsByRoleModel.find({ roleName: roleName })
               if (permisos.length > 0) { //si existen registros se eliminan todos los que coincidan con el roleName
                    const result = await PermissionsByRoleModel.deleteMany({ roleName: roleName });
                    //console.log(`permisos eliminados con el rol ${roleName}: `, result)
               }

               //4. Se verifica si existe este rol asignado a usuarios
               const currentUser = await SystemUserModel.find({ roles: { $all: [roleName] } })
               for (const user of currentUser) {
                    const resultado = await SystemUserModel.findOneAndUpdate(
                         { email: user.email },
                         { $pull: { roles: roleName } }
                    )
                    //console.log('resultado: ', resultado)
               }

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