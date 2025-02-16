import { authorizationSchema } from "../../../data/mongodb";

export class GetAuthorizationDto {
     constructor(
          public authorizationList: [typeof authorizationSchema]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetAuthorizationDto?] {
          const { authorizationList } = object;
          return [
               undefined,
               new GetAuthorizationDto(authorizationList)
          ];
     }

}