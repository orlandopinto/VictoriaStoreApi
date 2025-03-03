import { PermissionsByRoleModel, RolesModel, SystemUserModel } from "../../data/mongodb";
import { PermissionsByRoleDatasource } from "../../domain/datasources";
import { AddPermissionsByRoleDto } from "../../domain/dtos/permissions";
import { AddPermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
import { ActionsSelected, PermissionsByRole, Role, UsersByRole } from "../../domain/types";

export class PermissionsByRoleDatasourceImpl implements PermissionsByRoleDatasource {


     async addPermissionsByRole(addPermissionsByRoleDto: AddPermissionsByRoleDto): Promise<AddPermissionsByRoleEntity> {

          let { permissionsByRole } = addPermissionsByRoleDto;
          try {

               const permissions: PermissionsByRole = permissionsByRole; //{} as PermissionsByRole

               //REGISTRAR NUEVO ROL
               //permissions.newRole = permissionsByRole.newRole;

               const foundRole = RolesModel.create({ roleName: permissions.role.roleName, roleDescription: permissions.role.roleDescription })
               const roleResult = await (await foundRole).save();

               //REGISTRAR PERMISSIONS
               permissions.actionListSelected = permissionsByRole.actionListSelected;
               permissions.usersByRole = permissionsByRole.usersByRole;

               let permissionsByRoleList: ActionsSelected[] = [];

               permissions.actionListSelected.map((item) => {
                    const permissionsByRoleModel: ActionsSelected = {
                         id: roleResult._id.toString(),
                         roleId: item.roleId,
                         roleName: item.roleName,
                         resourseId: item.resourseId,
                         resourseName: item.resourseName,
                         actionId: item.actionId,
                         actionName: item.actionName
                    }
                    permissionsByRoleList.push(permissionsByRoleModel)
               })

               permissionsByRoleList.map(async (permissions) => {
                    // 1. Verificar si existe el role
                    //const exists = await PermissionsByRoleModel.findOne({ id: "p.id" })
                    //if (exists) throw CustomError.badRequest('Permission already exists.')

                    // 2. Crear el permissionsByRole
                    const newPermissions = await PermissionsByRoleModel.create({ permissions })
                    await newPermissions.save();

               })
               //ASIGNAR ROL A USUARIOS

               permissions.usersByRole.map(async (user) => {
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

               return new AddPermissionsByRoleEntity(permissions);

          } catch (error) {
               throw error;
          }

     }

     //NOTE: Los permisos con este rol se eliminaran desde Roles > deleteRole

     // async deletePermissionsByRole(deletePermissionsByRoleDto: DeletePermissionsByRoleDto): Promise<DeletePermissionsByRoleEntity> {
     //      let { id } = deletePermissionsByRoleDto;
     //      try {
     //           const exists = await PermissionsByRoleModel.findOne({ id: id })
     //           if (!exists) throw CustomError.badRequest("The id does not exist or has been deleted. [0] records deleted")

     //           const result = await PermissionsByRoleModel.deleteOne({ id });

     //           return new DeletePermissionsByRoleEntity(result);

     //      } catch (error) {
     //           throw error;
     //      }
     // }

     async getPermissionsByRole(): Promise<GetPermissionsByRoleEntity> {
          try {
               const permissionsByRoleModel = await PermissionsByRoleModel.find().lean();
               let permissionsByRoleList: PermissionsByRole[] = [];

               const foundRole = await RolesModel.find().lean();

               for (const role of foundRole) {
                    let actionsSelectedList: ActionsSelected[] = [];
                    if (!foundRole) continue;

                    const currentRole: Role = {
                         id: role._id.toString(),
                         roleName: role.roleName,
                         roleDescription: role.roleDescription
                    };

                    for (const permission of permissionsByRoleModel.filter(f => f.roleName === currentRole.roleName)) {
                         const actionsSelected: ActionsSelected = {
                              id: permission.id,
                              actionId: permission.actionId,
                              actionName: permission.actionName,
                              resourseId: permission.resourseId,
                              resourseName: permission.resourseName,
                              roleId: permission.roleId,
                              roleName: permission.roleName
                         };
                         actionsSelectedList.push(actionsSelected);
                    }

                    const userList = await SystemUserModel.find({ roles: { $all: [currentRole.roleName] } }).lean();
                    let usersByRoleList: UsersByRole[] = userList.map(user => ({
                         email: user.email,
                         firstName: user.firstName,
                         lastName: user.lastName,
                         imageProfilePath: user.imageProfilePath
                    }));

                    permissionsByRoleList.push({
                         role: currentRole,
                         actionListSelected: actionsSelectedList,
                         usersByRole: usersByRoleList
                    });
               }

               return new GetPermissionsByRoleEntity(permissionsByRoleList);
          } catch (error) {
               throw error;
          }
     }

}