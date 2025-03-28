export class UpdateWishListDto {

     private constructor(
          
	 public _id: string,
	 public user_Id: string,
	 public product_id: string

     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateWishListDto?] {

          const requiredFields = ['_id', 'user_Id', 'product_id'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update WishList`];
          }

          return [
               undefined,
               new UpdateWishListDto(
               	 object._id,
	 object.user_Id,
	 object.product_id
               )
          ];
     }
}
