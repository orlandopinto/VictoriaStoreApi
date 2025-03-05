import { pagesSchema } from "../../../data/mongodb";

export class GetPagesDto {
     constructor(
          public pages: [typeof pagesSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetPagesDto?] {
          const { pages } = object;
          return [
               undefined,
               new GetPagesDto(pages)
          ];
     }

}