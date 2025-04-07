
export class DeleteAttributeNameDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteAttributeNameDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete Attribute']

          return [
               undefined,
               new DeleteAttributeNameDto(_id)
          ];
     }

}
