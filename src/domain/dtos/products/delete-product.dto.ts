
export class DeleteProductDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteProductDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Product']

          return [
               undefined,
               new DeleteProductDto(_id)
          ];
     }

}
