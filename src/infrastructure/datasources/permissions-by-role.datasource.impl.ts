import { PermissionsByRoleModel, RolesModel, rolesSchema, SystemUserModel } from "../../data/mongodb";
import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
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
               }

               //REGISTRAR PERMISSIONS
               if (permissionsByRole.length > 0) {
                    const permissionsByRoleInsertResult = await PermissionsByRoleModel.insertMany(permissionsByRole)
                    console.log('permissionsByRoleInsertResult: ', permissionsByRoleInsertResult)
               }

               //ASIGNAR ROL A USUARIOS
               usersByRole.map(async (user) => {
                    const currentUser = await SystemUserModel.findOne({ email: user.email })
                    if (currentUser) {
                         await SystemUserModel.findOneAndUpdate(
                              { email: currentUser.email },
                              {
                                   $push: {
                                        keys: {
                                             'roles': roleResult.roleName
                                        }
                                   }
                              }
                         )
                    }
               })

               return new AddPermissionsByRoleEntity(role, permissionsByRole, usersByRole);

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