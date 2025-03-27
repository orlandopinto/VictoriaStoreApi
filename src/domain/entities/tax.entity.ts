import { taxesSchema } from "../../data/mongodb";

export class GetTaxesEntity {

     constructor(
          public taxes: [typeof taxesSchema][],
     ) { }

}