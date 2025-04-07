
export class DeleteProductVideoDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteProductVideoDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete ProductVideo']

          return [
               undefined,
               new DeleteProductVideoDto(_id)
          ];
     }

}
