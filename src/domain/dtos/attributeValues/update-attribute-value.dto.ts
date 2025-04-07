export class UpdateAttributeValueDto {

     private constructor(

          public _id: string,
          public attributeValue: string

     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateAttributeValueDto?] {

          const requiredFields = ['_id', 'attributeValue'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update AttributeValue`];
          }

          return [
               undefined,
               new UpdateAttributeValueDto(
                    object._id,
                    object.attributeValue
               )
          ];
     }
}
