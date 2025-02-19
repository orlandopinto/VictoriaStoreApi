import { rolesSchema } from "../../../data/mongodb";

export class GetRolesDto {
     constructor(
          public roles: [typeof rolesSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetRolesDto?] {
          const { roles } = object;
          return [
               undefined,
               new GetRolesDto(roles)
          ];
     }

}