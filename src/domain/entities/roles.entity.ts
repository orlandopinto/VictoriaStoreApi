import { rolesSchema } from "../../data/mongodb";

export class RolesEntity {

     constructor(
          public id: string,
          public roleName: string,
          public roleDescription: string | null,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

}

export class DeleteRoleEntity {

     constructor(
          public roleName: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

}

export class GetRolesEntity {

     constructor(
          public roles: [typeof rolesSchema][],
     ) { }

}