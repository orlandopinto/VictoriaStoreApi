import { taxesSchema } from "../../../data/mongodb";

export class GetTaxesDto {
     constructor(
          public taxes: [typeof taxesSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetTaxesDto?] {
          const { taxes } = object;
          return [
               undefined,
               new GetTaxesDto(taxes)
          ];
     }

}