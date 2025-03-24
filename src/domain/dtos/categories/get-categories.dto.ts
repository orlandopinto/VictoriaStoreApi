import { categoriesSchema } from "../../../data/mongodb/models/categories.model";

export class GetCategoriesDto {
     constructor(
          public categories: [typeof categoriesSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetCategoriesDto?] {

          const { categories } = object;
          return [
               undefined,
               new GetCategoriesDto(categories)
          ];
     }

}