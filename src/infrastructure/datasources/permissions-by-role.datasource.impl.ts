import { AppLogger } from "../../config/appLogger";
import { PermissionsByRoleModel, RolesModel, rolesSchema, SystemUsersModel } from "../../data/mongodb";
import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto, UpdatePermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity, UpdatePermissionsByRoleEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { PermissionsByRole, PermissionsProfile, Role, UsersByRole } from "../../domain/types";

export class PermissionsByRoleDatasourceImpl implements PermissionsByRoleDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("PermissionsByRoleDatasourceImpl");
     }


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
                    for (let permission of permissionsByRole) {
                         permission.id = `${roleResult._id}.${permission.id}`
                    }
                    await PermissionsByRoleModel.insertMany(permissionsByRole)
               }

               //ASIGNAR ROL A USUARIOS
               await Promise.all(usersByRole.map(async (user) => {
                    const currentUser = await SystemUsersModel.findOne({ email: user.email });
                    if (currentUser) {
                         await SystemUsersModel.findOneAndUpdate(
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
               this.logger.Error(error as Error);
               throw error;
          }

     }

     async updatePermissionsByRole(updatePermissionsByRoleDto: UpdatePermissionsByRoleDto): Promise<UpdatePermissionsByRoleEntity> {

          let { role, permissionsByRole, usersByRole } = updatePermissionsByRoleDto;
          try {

               // ACTUALIZAR SOLO roleDescription
               let roleResult = {} as any;
               if (role.hasOwnProperty('roleName')) {
                    roleResult = await RolesModel.findByIdAndUpdate(
                         role._id,
                         {
                              roleDescription: role.roleDescription
                         },
                         { new: true }
                    )

                    if (!roleResult)
                         throw CustomError.badRequest("An error occurred while updating data.")
               }

               // PERMISSIONS
               if (permissionsByRole.length > 0) {
                    for (let perms of permissionsByRole) {
                         if (perms.id.split('.').length === 2) {
                              perms.id = `${role._id}.${perms.id}`
                         }
                    }

                    //ELIMINAR TODOS LOS PERMISOS CON EL ROL A ACTUALIZAR
                    let permisos = await PermissionsByRoleModel.find({ roleName: role.roleName })
                    if (permisos.length > 0) { //si existen registros se eliminan todos los que coincidan con el roleName
                         await PermissionsByRoleModel.deleteMany({ roleName: role.roleName });
                    }

                    //INSERTAR LOS PERMISOS QUE VIENEN EN LA LISTA
                    await PermissionsByRoleModel.insertMany(permissionsByRole)
               }

               //SE ELIMINA EL ROL A TODOS LOS USUARIOS QUE LOS TENGAN
               await new Promise(async (resolve, reject) => {
                    try {
                         const userList = await SystemUsersModel.find({ roles: { $all: [role.roleName] } });
                         for (const user of userList) {
                              await SystemUsersModel.findOneAndUpdate(
                                   { email: user.email },
                                   { $pull: { roles: role.roleName } }
                              );
                         }
                         resolve(true);
                    } catch (error) {
                         reject(error);
                    }
               });

               //ASIGNAR ROL A USUARIOS QUE VENGAN EN EL ARREGLO
               await Promise.all(usersByRole.map(async (user) => {

                    const currentUser = await SystemUsersModel.findOne({ email: user.email });
                    if (currentUser) {
                         await SystemUsersModel.findOneAndUpdate(
                              { email: currentUser.email },
                              {
                                   $push: {
                                        roles: roleResult.roleName
                                   }
                              }
                         );
                    }
               }))


               return new UpdatePermissionsByRoleEntity(role, permissionsByRole, usersByRole);

          } catch (error) {
               this.logger.Error(error as Error);
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
                         _id: role._id.toString(),
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

                    const userList = await SystemUsersModel.find({ roles: { $all: [currentRole.roleName] } }).lean();
                    let usersByRoleList: UsersByRole[] = userList.map(user => ({
                         email: user.email,
                         firstName: user.firstName,
                         lastName: user.lastName,
                         public_id: user.public_id,
                         secure_url: user.secure_url
                    }));

                    permissionsProfile.push({
                         role: currentRole,
                         permissionsByRole: permissionsByRoleList,
                         usersByRole: usersByRoleList
                    });
               }

               return new GetPermissionsByRoleEntity(permissionsProfile);
          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }

}