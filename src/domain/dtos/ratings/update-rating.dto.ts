import { ObjectId } from "mongoose";
import { Decimal } from "../../../data/mongodb";

export class UpdateRatingDto {

     private constructor(

          public _id: string,
          public product_id: ObjectId,
          public average: typeof Decimal,
          public count: number

     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateRatingDto?] {

          const requiredFields = ['_id', 'product_id', 'average', 'count'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update Rating`];
          }

          return [
               undefined,
               new UpdateRatingDto(
                    object._id,
                    object.product_id,
                    object.average,
                    object.count
               )
          ];
     }
}
