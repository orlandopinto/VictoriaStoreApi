import { AddAccessEntity, DeleteAccessEntity, GetAccessEntity } from "../../domain/entities";

export class AccessMapper {

     static addAccessEntityFromObject(object: { [key: string]: any }) {

          let { id, _id, roleId, resourseId, actionId, hasError, errorMessages } = object

          let errors: string[] = []
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS *********

          if (!id) errors.push('Missing ID')
          if (!roleId) errors.push('Missing role ID')
          if (!resourseId) errors.push('Missing resourse ID')
          if (!actionId) errors.push('Missing action ID')

          if (errors.length > 0) {
               hasError = true;
               errorMessages = [...errors]
               return new AddAccessEntity(_id || id, roleId, resourseId, actionId, hasError, errorMessages);
          }

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new AddAccessEntity(_id || id, roleId, resourseId, actionId, hasError, errorMessages);
     }

     static deleteAccessEntityFromObject(object: { [key: string]: any }) {

          let { id, hasError, message } = object

          // if (!id) {
          //      hasError = true;
          //      message = 'Missing ID'
          //      throw new Error('Missing ID')
          // }
          return new DeleteAccessEntity(id, hasError, message);
     }

     static getAccessListEntityFromObject(object: { [key: string]: any }) {
          const { access, hasError, message } = object
          return new GetAccessEntity(access, hasError, message);

     }

}