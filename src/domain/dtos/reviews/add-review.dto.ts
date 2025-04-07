import { ObjectId } from "mongoose";
import { Decimal } from "../../../data/mongodb";

export class AddReviewDto {

     private constructor(

          public _id: string,
          public product_id: ObjectId,
          public user_Id: ObjectId,
          public rating: typeof Decimal,
          public count: number,
          public comment: string

     ) { }

     static create(object: { [key: string]: any }): [string?, AddReviewDto?] {

          const requiredFields = ['_id', 'product_id', 'user_Id', 'rating', 'count', 'comment'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update Review`];
          }

          return [
               undefined,
               new AddReviewDto(
                    object._id,
                    object.product_id,
                    object.user_Id,
                    object.rating,
                    object.count,
                    object.comment
               )
          ];
     }
}
