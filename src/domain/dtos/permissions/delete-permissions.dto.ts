
export class DeletePermissionsDto {
     constructor(
          public id: string,
          public hasError: boolean | undefined,
          public errorMessage: string[]
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeletePermissionsDto?] {
          let { id, hasError, errorMessage } = object

          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS *********

          if (!id) return ['Missing id']

          // ********************** FIN DE LA VALIDACIÓN *********************
          return [
               undefined,
               new DeletePermissionsDto(id, hasError, errorMessage)
          ];
     }

}