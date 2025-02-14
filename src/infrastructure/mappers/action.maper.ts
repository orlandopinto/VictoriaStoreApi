import { DeleteActionEntity, ActionEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ActionMapper {

     static actionEntityFromObject(object: { [key: string]: any }) {

          const { id, _id, actionName } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!actionName) throw CustomError.badRequest('Missing action name')

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new ActionEntity(_id || id, actionName);
     }

     static deleteActionEntityFromObject(object: { [key: string]: any }) {
          const { actionName, message } = object
          return new DeleteActionEntity(actionName, message);
     }

}