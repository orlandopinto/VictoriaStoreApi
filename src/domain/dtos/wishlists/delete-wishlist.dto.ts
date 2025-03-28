
export class DeleteWishListDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteWishListDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete WishList']

          return [
               undefined,
               new DeleteWishListDto(_id)
          ];
     }

}
