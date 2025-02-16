
export class AddAuthorizationDto {
     constructor(
          public id: string,
          public roleId: string,
          public resourseId: string,
          public actionId: string,
          public hasError: boolean,
          public message: string

     ) { }

     static create(object: { [key: string]: any }): [string?, AddAuthorizationDto?] {
          const { id, roleId, resourseId, actionId, hasError, message } = object;
          // if (!roleId) return ['Missing role ID']
          // if (!resourseId) return ['Missing resourse ID']
          // if (!actionId) return ['Missing action ID']
          return [
               undefined,
               new AddAuthorizationDto(id, roleId, resourseId, actionId, hasError, message)
          ];
     }

}