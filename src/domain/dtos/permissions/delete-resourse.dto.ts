
export class DeleteResourseDto {
     constructor(
          public resourseName: string,
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteResourseDto?] {
          const { resourseName } = object;
          return [
               undefined,
               new DeleteResourseDto(resourseName)
          ];
     }

}