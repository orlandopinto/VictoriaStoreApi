import { wishListSchema } from "../../data/mongodb/models/wishlist.models";
export class AddWishListEntity {

     constructor(

          public _id: string,
          public user_Id: string,
          public product_id: string

     ) { }

}

export class UpdateWishListEntity {

     constructor(

          public _id: string,
          public user_Id: string,
          public product_id: string

     ) { }

}

export class DeleteWishListEntity {

     constructor(public wishlistName: string) { }
     /*
     NOTE: Validar si el campo tiene el sufijo "Name"
     */

}

export class GetWishListsEntity {

     constructor(public wishlists: [typeof wishListSchema][]) { }

}
