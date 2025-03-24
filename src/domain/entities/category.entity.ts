import { categoriesSchema } from "../../data/mongodb/models/categories.model";

export class CategoryEntity {
     constructor(
          public _id: string,
          public categoryName: string,
          public slug: string,
          public categoryDescription: string,
          public public_id: string,
          public secure_url: string,
          public createdAt?: string,
          public updatedAt?: string
     ) { }
}

export class GetCategoriesEntity {

     constructor(
          public categories: [typeof categoriesSchema][],
     ) { }

}