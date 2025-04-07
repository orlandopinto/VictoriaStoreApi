export class UpdateAttributeNameDto {

     private constructor(

          public _id: string,
          public attributeName: string

     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateAttributeNameDto?] {

          const requiredFields = ['_id', 'attributeName'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update Attribute`];
          }

          return [
               undefined,
               new UpdateAttributeNameDto(
                    object._id,
                    object.attributeName
               )
          ];
     }
}
