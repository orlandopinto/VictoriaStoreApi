
export class AddResourseDto {
     constructor(
          public resourseName: string
     ) { }

     static create(object: { [key: string]: any }): [string?, AddResourseDto?] {
          const { resourseName } = object;
          if (!resourseName) return ['Missing resourse name']

          return [
               undefined,
               new AddResourseDto(resourseName)
          ];
     }

}