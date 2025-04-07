
export class DeleteAttributeValueDto {

     constructor(
          public _id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteAttributeValueDto?] {

          const { _id } = object;

          if (_id === undefined) return ['Missing _id on delete attribute value']

          return [
               undefined,
               new DeleteAttributeValueDto(_id)
          ];
     }

}
