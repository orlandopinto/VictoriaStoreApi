import { ActionsModel } from "../../data/mongodb";
import { ActionDatasource } from "../../domain/datasources";
import { AddActionDto, DeleteActionDto } from "../../domain/dtos/roles-permissions";
import { ActionEntity, DeleteActionEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ActionDatasourceImpl implements ActionDatasource {

     async addAction(addActionDto: AddActionDto): Promise<ActionEntity> {
          const { actionName, hasError, errorMessage } = addActionDto;
          try {
               // 1. Crear el action
               const action = await ActionsModel.create({ actionName: actionName })
               await action.save();

               // 2. Mapear la respuesta a la entidad
               return new ActionEntity(action.id, actionName, hasError, errorMessage);

          } catch (error) {
               throw error;
          }
     }

     async deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity> {
          const { actionName, hasError, errorMessage } = deleteActionDto;
          let message: string = "No hay action que coincida con la consulta. Se eliminaron 0 actions."
          try {
               const exists = await ActionsModel.findOne({ actionName: actionName })
               if (!exists) throw CustomError.badRequest("The role name does not exist or has been deleted.")

               // 2. eliminar el role
               await ActionsModel.deleteOne({ actionName: actionName })

               return new DeleteActionEntity(actionName, hasError, errorMessage);

          } catch (error) {
               throw error;
          }
     }

}