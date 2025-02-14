
export class AddActionDto {
     constructor(
          public actionName: string
     ) { }

     static create(object: { [key: string]: any }): [string?, AddActionDto?] {
          const { actionName } = object;
          if (!actionName) return ['Missing action name']

          return [
               undefined,
               new AddActionDto(actionName)
          ];
     }

}