
export class DeleteVariantDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteVariantDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Variant']

          return [
               undefined,
               new DeleteVariantDto(_id)
          ];
     }

}
