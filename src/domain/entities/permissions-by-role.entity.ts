import { PermissionsByRole, PermissionsProfile, Role, UsersByRole } from "../types";

export class AddPermissionsByRoleEntity {

     constructor(
          public role: Role,
          public permissionsByRole: PermissionsByRole[],
          public usersByRole: UsersByRole[]
     ) { }

}

export class UpdatePermissionsByRoleEntity {

     constructor(
          public role: Role,
          public permissionsByRole: PermissionsByRole[],
          public usersByRole: UsersByRole[]
     ) { }

}

export class GetPermissionsByRoleEntity {

     constructor(public permissionsProfile: PermissionsProfile[]) { }

}