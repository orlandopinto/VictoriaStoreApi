export class AddAttributeValueDto {

     private constructor(

          public attributeValue: string

     ) { }

     static create(object: { [key: string]: any }): [string?, AddAttributeValueDto?] {

          const requiredFields = ['attributeValue'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on create attribute value`];
          }

          return [
               undefined,
               new AddAttributeValueDto(
                    object.attributeValue
               )
          ];
     }
}
