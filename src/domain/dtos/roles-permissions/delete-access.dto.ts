
export class DeleteAccessDto {
     constructor(
          public id: string,
          public hasError: boolean,
          public message: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeleteAccessDto?] {
          let { id, hasError, message } = object
          return [
               undefined,
               new DeleteAccessDto(id, hasError, message)
          ];
     }

}