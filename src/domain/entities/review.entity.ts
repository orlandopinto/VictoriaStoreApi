import { ObjectId } from "mongoose";
import { Decimal, reviewsSchema } from "../../data/mongodb";
export class AddReviewEntity {

     constructor(

          public _id: string,
          public product_id: ObjectId,
          public user_Id: ObjectId,
          public rating: typeof Decimal,
          public count: number,
          public comment: string

     ) { }

}


export class DeleteReviewEntity {

     constructor(public _id: string) { }

}

export class GetReviewsEntity {

     constructor(public reviews: [typeof reviewsSchema][]) { }

}

