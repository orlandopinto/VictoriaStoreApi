import { permissionsActionsSchema, permissionsByRoleSchema } from "../../data/mongodb";

export class AddPermissionsByRoleEntity {

     constructor(
          public permissionId: string,
          public roleName: string,
          public resourseName: string,
          public permissionActionsIds: [typeof permissionsActionsSchema]
     ) { }

}

export class DeletePermissionsByRoleEntity {

     constructor(
          public roleName: string,
          public resourseName: string,
          public hasError: boolean,
          public message: string
     ) { }

}

export class GetPermissionsByRoleEntity {

     constructor(
          public permissionsByRoles: [typeof permissionsByRoleSchema],
          public message: string
     ) { }

}