export class UpdateDiscountDto {

     private constructor(

          public _id: string,
          public discountName: string,
          public discountValue: string | null

     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateDiscountDto?] {

          const requiredFields = ['_id', 'discountName', 'discountValue'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update Discount`];
          }

          return [
               undefined,
               new UpdateDiscountDto(
                    object._id,
                    object.discountName,
                    object.discountValue
               )
          ];
     }
}