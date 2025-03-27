import { subCategoriesSchema } from "../../data/mongodb";

export class SubCategoryEntity {
     constructor(
          public _id: string,
          public subCategoryName: string,
          public slug: string,
          public CategoryId: string,
          public subCategoryDescription: string,
          public createdAt?: string,
          public updatedAt?: string
     ) { }
}

export class GetSubCategoriesEntity {

     constructor(
          public subCategories: [typeof subCategoriesSchema][],
     ) { }

}