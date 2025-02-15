import { DeletePermissionsByRoleDto } from "../../domain/dtos/roles-permissions";
import { AddPermissionsByRoleEntity, DeletePermissionsByRoleEntity, GetPermissionsByRoleEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class PermissionsByRoleMapper {

     static addPermissionsByRoleEntityFromObject(object: { [key: string]: any }) {

          const { permissionId, _id, roleName, resourseName, permissionActionsIds } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!permissionId) return ['Missing permission id', 'prueba de mensajes']
          if (!roleName) return ['Missing role name']
          if (!resourseName) return ['Missing resourse name']
          if (!permissionActionsIds.idRole) return ['Missing id Role']
          if (!permissionActionsIds.idResourse) return ['Missing id Resourse']
          if (!permissionActionsIds.idAction) return ['Missing id Action']

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new AddPermissionsByRoleEntity(permissionId || _id, roleName, resourseName, permissionActionsIds);
     }

     static deletePermissionsByRoleEntityFromObject(object: { [key: string]: any }) {

          let { roleName, resourseName, hasError, message } = object

          if (!roleName) {
               hasError = true;
               message = 'Missing role name'
          }
          if (!resourseName) {
               hasError = true;
               message = 'Missing resourse name'
          }

          return new DeletePermissionsByRoleEntity(roleName, resourseName, hasError, message);
     }

     static getPermissionsByRoleListEntityFromObject(object: { [key: string]: any }) {
          const { permissionsByRoles, message } = object
          return new GetPermissionsByRoleEntity(permissionsByRoles, message);
     }

}