import { PermissionsByRole, Role } from "../types";

export class AddPermissionsByRoleEntity {

     constructor(
          public permissionsByRole: PermissionsByRole,
     ) { }

}

// export class DeletePermissionsByRoleEntity {

//      constructor(public role: Role) { }

// }

export class GetPermissionsByRoleEntity {

     constructor(public permissionsByRole: PermissionsByRole[]) { }

}