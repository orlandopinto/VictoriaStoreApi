
export class DeletePageDto {
     constructor(
          public pageName: string,
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeletePageDto?] {
          const { pageName } = object;
          return [
               undefined,
               new DeletePageDto(pageName)
          ];
     }

}