
export class DeletePermissionsByRoleDto {
     constructor(
          public id: string
     ) { }

     static delete(object: { [key: string]: any }): [string?, DeletePermissionsByRoleDto?] {
          let { id } = object

          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS *********

          if (!id) return ['Missing id']

          // ********************** FIN DE LA VALIDACIÓN *********************
          return [
               undefined,
               new DeletePermissionsByRoleDto(id)
          ];
     }

}