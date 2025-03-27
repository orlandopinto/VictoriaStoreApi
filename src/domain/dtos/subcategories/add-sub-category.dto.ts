
export class AddSubCategoryDto {
     constructor(
          public _id: string,
          public subCategoryName: string,
          public slug: string,
          public CategoryId: string,
          public subCategoryDescription: string
     ) { }


     static create(object: { [key: string]: any }): [string?, AddSubCategoryDto?] {

          const { _id, subCategoryName, slug, CategoryId, subCategoryDescription } = object;

          if (subCategoryName === undefined) return ['Missing Sub Category name on create sub category']
          if (slug === undefined) return ['Missing slug on create sub category']
          if (CategoryId === undefined) return ['Missing Category Id on create sub category']
          if (subCategoryDescription === undefined) return ['Missing sub category description on create sub category']

          return [
               undefined,
               new AddSubCategoryDto(_id, subCategoryName, slug, CategoryId, subCategoryDescription)
          ];
     }

}