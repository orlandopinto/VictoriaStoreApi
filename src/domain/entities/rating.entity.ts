import { ObjectId } from "mongoose";
import { ratingsSchema } from "../../data/mongodb";
import { Decimal } from '../../data/mongodb/models/ratings.model';
export class AddRatingEntity {

     constructor(

          public _id: string,
          public product_id: ObjectId,
          public average: typeof Decimal,
          public count: number

     ) { }

}

export class UpdateRatingEntity {

     constructor(

          public _id: string,
          public product_id: ObjectId,
          public average: typeof Decimal,
          public count: number

     ) { }

}

export class DeleteRatingEntity {

     constructor(public _id: string) { }

}

export class GetRatingsEntity {

     constructor(public ratings: [typeof ratingsSchema][]) { }

}

