import { ActionsSelected, PermissionsByRole, Role, UsersByRole } from "../types";

export class AddPermissionsByRoleEntity {

     constructor(
          public role: Role,
          public actionsSelected: ActionsSelected[],
          public usersByRole: UsersByRole[]
     ) { }

}

// export class DeletePermissionsByRoleEntity {

//      constructor(public role: Role) { }

// }

export class GetPermissionsByRoleEntity {

     constructor(public permissionsByRole: PermissionsByRole[]) { }

}