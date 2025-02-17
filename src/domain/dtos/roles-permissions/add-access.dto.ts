
export class AddAccessDto {
     constructor(
          public id: string,
          public roleId: string,
          public resourseId: string,
          public actionId: string,
          public hasError: boolean,
          public errorMessages?: string[]

     ) { }

     static create(object: { [key: string]: any }): [string?, AddAccessDto?] {
          const { id, roleId, resourseId, actionId, hasError, errorMessages } = object;
          return [
               undefined,
               new AddAccessDto(id, roleId, resourseId, actionId, hasError, errorMessages)
          ];
     }

}