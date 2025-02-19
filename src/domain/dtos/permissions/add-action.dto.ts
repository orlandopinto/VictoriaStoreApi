
export class AddActionDto {
     constructor(
          public actionName: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }


     static create(object: { [key: string]: any }): [string?, AddActionDto?] {
          const { actionName, hasError, errorMessage } = object;
          if (!actionName) return ['Missing action name on create action']

          return [
               undefined,
               new AddActionDto(actionName, hasError, errorMessage)
          ];
     }

}