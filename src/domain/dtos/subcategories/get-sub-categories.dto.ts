import { subCategoriesSchema } from "../../../data/mongodb/models/sub-categories.model";

export class GetSubCategoriesDto {

     constructor(
          public subCategories: [typeof subCategoriesSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetSubCategoriesDto?] {

          const { subCategories } = object;
          return [
               undefined,
               new GetSubCategoriesDto(subCategories)
          ];
     }

}