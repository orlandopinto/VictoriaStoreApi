
export class DeleteActionDto {
     constructor(
          public actionName: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteActionDto?] {
          const { actionName, hasError, errorMessage } = object;
          return [
               undefined,
               new DeleteActionDto(actionName, hasError, errorMessage)
          ];
     }

}