import { rolesSchema } from "../../data/mongodb";

export class AddRoleEntity {

     constructor(
          public id: string,
          public roleName: string,
          public roleDescription: string | null
     ) { }

}

export class DeleteRoleEntity {

     constructor(
          public roleName: string
     ) { }

}

export class GetRolesEntity {

     constructor(
          public roles: [typeof rolesSchema][],
     ) { }

}