import { permissionsByRoleSchema } from "../../data/mongodb";

export class AddPermissionsByRoleEntity {

     constructor(
          public id: string,
          public roleId: string,
          public roleName: string,
          public resourseId: string,
          public resourseName: string,
          public actionId: string,
          public actionName: string
     ) { }

}

export class DeletePermissionsByRoleEntity {

     constructor(public id: string) { }

}

export class GetPermissionsByRoleEntity {

     constructor(public permissionsByRole: [typeof permissionsByRoleSchema][]) { }

}