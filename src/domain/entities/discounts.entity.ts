import { discountsSchema } from "../../data/mongodb";

export class AddDiscountEntity {

     constructor(

          public _id: string,
          public discountName: string,
          public discountValue: string | null

     ) { }

}

export class UpdateDiscountEntity {

     constructor(

          public _id: string,
          public discountName: string,
          public discountValue: string | null

     ) { }

}

export class DeleteDiscountEntity {

     constructor(public discountName: string) { }

}

export class GetDiscountsEntity {

     constructor(public discounts: [typeof discountsSchema][]) { }

}

