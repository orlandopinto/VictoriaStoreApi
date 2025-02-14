import { DeleteResourseEntity, ResourseEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ResourseMapper {

     static resourseEntityFromObject(object: { [key: string]: any }) {

          const { id, _id, resourseName } = object
          // ********* VALIDAR TODOS LOS CAMPOS QUE SON OBLIGATORIOS ********* 

          if (!resourseName) throw CustomError.badRequest('Missing resourse name')

          // ********************** FIN DE LA VALIDACIÓN *********************
          return new ResourseEntity(_id || id, resourseName);
     }

     static deleteResourseEntityFromObject(object: { [key: string]: any }) {
          const { resourseName, message } = object
          return new DeleteResourseEntity(resourseName, message);
     }

}