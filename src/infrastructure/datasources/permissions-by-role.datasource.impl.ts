import { PermissionsByRoleModel, RolesModel, rolesSchema, SystemUserModel } from "../../data/mongodb";
import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity, UpdatePermissionsByRoleEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { PermissionsByRole, PermissionsProfile, Role, UsersByRole } from "../../domain/types";

export class PermissionsByRoleDatasourceImpl implements PermissionsByRoleDatasource {

     async addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity> {

          let { role, permissionsByRole, usersByRole } = addPermissionsByRoleDto;
          try {

               //REGISTRAR NUEVO ROL
               let roleResult = {} as any;
               if (role.hasOwnProperty('roleName')) {
                    const foundRole = await RolesModel.create({ roleName: role.roleName, roleDescription: role.roleDescription })
                    roleResult = await foundRole.save() as unknown as typeof rolesSchema;
                    for (const perms of permissionsByRole) {
                         perms.roleId = foundRole._id.toString();
                    }
               }

               //REGISTRAR PERMISSIONS
               if (permissionsByRole.length > 0) {
                    await PermissionsByRoleModel.insertMany(permissionsByRole)
               }

               //ASIGNAR ROL A USUARIOS
               await Promise.all(usersByRole.map(async (user) => {
                    const currentUser = await SystemUserModel.findOne({ email: user.email });
                    if (currentUser) {
                         await SystemUserModel.findOneAndUpdate(
                              { email: currentUser.email },
                              {
                                   $push: {
                                        roles: roleResult.roleName
                                   }
                              }
                         );
                    }
               }));

               return new AddPermissionsByRoleEntity(role, permissionsByRole, usersByRole);

          } catch (error) {
               throw error;
          }

     }

     async updatePermissionsByRole(updatePermissionsByRoleDto: UpdatePermissionsByRoleDto): Promise<UpdatePermissionsByRoleEntity> {

          let { role, permissionsByRole, usersByRole } = updatePermissionsByRoleDto;
          try {

               // ACTUALIZAR SOLO roleDescription
               let roleResult = {} as any;
               if (role.hasOwnProperty('roleName')) {
                    const result = await RolesModel.findByIdAndUpdate(
                         role.id,
                         {
                              roleDescription: role.roleDescription
                         },
                         { new: true }
                    )

                    if (!result)
                         throw CustomError.badRequest("An error occurred while updating data.")
               }

               // PERMISSIONS
               if (permissionsByRole.length > 0) {
                    //ELIMINAR TODOS LOS PERMISOS CON EL ROL A ACTUALIZAR
                    let permisos = await PermissionsByRoleModel.find({ roleName: role.roleName })
                    if (permisos.length > 0) { //si existen registros se eliminan todos los que coincidan con el roleName
                         await PermissionsByRoleModel.deleteMany({ roleName: role.roleName });
                    }

                    //INSERTAR LOS PERMISOS QUE VIENEN EN LA LISTA
                    await PermissionsByRoleModel.insertMany(permissionsByRole)
               }

               // ASIGNAR ROL A USUARIOS
               // SOLO SE VA A ASIGNAR EL ROL A LOS USUARIOS QUE VIENEN EN LA LISTA
               await Promise.all(usersByRole.map(async (user) => {
                    const currentUser = await SystemUserModel.findOne({ email: user.email });
                    if (currentUser) {
                         await SystemUserModel.findOneAndUpdate(
                              { email: currentUser.email },
                              {
                                   $push: {
                                        roles: roleResult.roleName
                                   }
                              }
                         );
                    }
               }));

               return new UpdatePermissionsByRoleEntity(role, permissionsByRole, usersByRole);

          } catch (error) {
               throw error;
          }
     }

     async getPermissionsByRole(): Promise<GetPermissionsByRoleEntity> {
          try {
               const permissionsByRoleModel = await PermissionsByRoleModel.find().lean();
               let permissionsProfile: PermissionsProfile[] = [];

               const foundRole = await RolesModel.find().lean();

               for (const role of foundRole) {
                    let permissionsByRoleList: PermissionsByRole[] = [];
                    if (!foundRole) continue;

                    const currentRole: Role = {
                         id: role._id.toString(),
                         roleName: role.roleName,
                         roleDescription: role.roleDescription
                    };

                    for (const permission of permissionsByRoleModel.filter(f => f.roleName === currentRole.roleName)) {
                         const permissionsByRole: PermissionsByRole = {
                              id: permission.id,
                              actionId: permission.actionId,
                              actionName: permission.actionName,
                              pageId: permission.pageId,
                              pageName: permission.pageName,
                              roleId: permission.roleId,
                              roleName: permission.roleName
                         };
                         permissionsByRoleList.push(permissionsByRole);
                    }

                    const userList = await SystemUserModel.find({ roles: { $all: [currentRole.roleName] } }).lean();
                    let usersByRoleList: UsersByRole[] = userList.map(user => ({
                         email: user.email,
                         firstName: user.firstName,
                         lastName: user.lastName,
                         imageProfilePath: user.imageProfilePath
                    }));

                    permissionsProfile.push({
                         role: currentRole,
                         permissionsByRole: permissionsByRoleList,
                         usersByRole: usersByRoleList
                    });
               }

               return new GetPermissionsByRoleEntity(permissionsProfile);
          } catch (error) {
               throw error;
          }
     }

}