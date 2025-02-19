import { resourseSchema } from "../../../data/mongodb";

export class GetResoursesDto {
     constructor(
          public resourses: [typeof resourseSchema][]
     ) { }

     static get(object: { [key: string]: any }): [string?, GetResoursesDto?] {
          const { resourses } = object;
          return [
               undefined,
               new GetResoursesDto(resourses)
          ];
     }

}