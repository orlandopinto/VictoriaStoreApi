
export class DeleteAttributeDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteAttributeDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Attribute']

          return [
               undefined,
               new DeleteAttributeDto(_id)
          ];
     }

}
