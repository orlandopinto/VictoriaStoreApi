
export class DeleteDiscountDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteDiscountDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Discounts']

          return [
               undefined,
               new DeleteDiscountDto(_id)
          ];
     }

}
