export class UpdateSubCategoryDto {

     private constructor(
          public _id: string,
          public subCategoryName: string,
          public slug: string,
          public CategoryId: string,
          public subCategoryDescription: string
     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateSubCategoryDto?] {

          const requiredFields = ['_id', 'subCategoryName', 'slug', 'CategoryId', 'subCategoryDescription'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update sub category`];
          }

          return [
               undefined,
               new UpdateSubCategoryDto(
                    object._id,
                    object.subCategoryName,
                    object.slug,
                    object.CategoryId,
                    object.subCategoryDescription
               )
          ];
     }
}