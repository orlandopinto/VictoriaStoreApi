
export class DeleteAuthorizationDto {
     constructor(
          public id: string,
          public hasError: boolean,
          public message: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteAuthorizationDto?] {
          let { id, hasError, message } = object
          return [
               undefined,
               new DeleteAuthorizationDto(id, hasError, message)
          ];
     }

}