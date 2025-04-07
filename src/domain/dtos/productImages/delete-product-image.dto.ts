
export class DeleteProductImageDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteProductImageDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete ProductImage']

          return [
               undefined,
               new DeleteProductImageDto(_id)
          ];
     }

}
