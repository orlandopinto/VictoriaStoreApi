
export class AddPageDto {
     constructor(
          public pageName: string
     ) { }

     static create(object: { [key: string]: any }): [string?, AddPageDto?] {
          const { pageName } = object;
          if (!pageName) return ['Missing page name']

          return [
               undefined,
               new AddPageDto(pageName)
          ];
     }

}