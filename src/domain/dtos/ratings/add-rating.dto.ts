import { ObjectId } from "mongoose";
import { Decimal } from "../../../data/mongodb";

export class AddRatingDto {

     private constructor(

          public product_id: ObjectId,
          public average: typeof Decimal,
          public count: number

     ) { }

     static create(object: { [key: string]: any }): [string?, AddRatingDto?] {

          const requiredFields = ['product_id', 'average', 'count'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update Rating`];
          }

          return [
               undefined,
               new AddRatingDto(
                    object.product_id,
                    object.average,
                    object.count
               )
          ];
     }
}
