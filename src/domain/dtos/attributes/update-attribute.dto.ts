export class UpdateAttributeDto {

     private constructor(

          public _id: string,
          public attributeName: string,
          public attributeValue: string | null

     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateAttributeDto?] {

          const requiredFields = ['_id', 'attributeName', 'attributeValue'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update Attribute`];
          }

          return [
               undefined,
               new UpdateAttributeDto(
                    object._id,
                    object.attributeName,
                    object.attributeValue
               )
          ];
     }
}
