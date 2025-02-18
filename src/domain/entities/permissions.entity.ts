import { permissionsSchema } from "../../data/mongodb";

export class AddPermissionsEntity {

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

export class DeletePermissionsEntity {

     constructor(public id: string) { }

}

export class GetPermissionsEntity {

     constructor(public permissions: [typeof permissionsSchema][]) { }

}