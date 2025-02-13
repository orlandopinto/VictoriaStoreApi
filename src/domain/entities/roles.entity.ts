export class RolesEntity {

     constructor(
          public id: string,
          public roleName: string
     ) { }

}

export class DeleteRoleEntity {

     constructor(
          public roleName: string,
          public message: string
     ) { }

}