export class UpdateCategoryDto {

     private constructor(
          public _id: string,
          public categoryName: string,
          public slug: string,
          public categoryDescription: string,
          public public_id: string,
          public secure_url: string
     ) { }

     static update(object: { [key: string]: any }): [string?, UpdateCategoryDto?] {

          const requiredFields = ['_id', 'categoryName', 'slug', 'categoryDescription', 'public_id', 'secure_url'];
          for (const field of requiredFields) {
               if (object[field] === undefined) return [`Missing ${field} on update category`];
          }

          return [
               undefined,
               new UpdateCategoryDto(
                    object._id,
                    object.categoryName,
                    object.slug,
                    object.categoryDescription,
                    object.public_id,
                    object.secure_url
               )
          ];
     }
}