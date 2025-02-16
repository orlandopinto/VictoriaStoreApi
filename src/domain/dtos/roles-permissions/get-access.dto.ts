import { accessSchema } from "../../../data/mongodb";

export class GetAccessDto {
     constructor(
          public accessList: [typeof accessSchema]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetAccessDto?] {
          const { accessList } = object;
          return [
               undefined,
               new GetAccessDto(accessList)
          ];
     }

}