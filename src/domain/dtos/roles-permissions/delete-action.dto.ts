
export class DeleteActionDto {
     constructor(
          public actionName: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteActionDto?] {
          const { actionName } = object;
          return [
               undefined,
               new DeleteActionDto(actionName)
          ];
     }

}