import { ActionDatasource } from "../../domain/datasources";
import { AddActionDto, DeleteActionDto } from "../../domain/dtos/roles-permissions";
import { ActionEntity, DeleteActionEntity } from "../../domain/entities";
import { ActionsModel } from "../../data/mongodb";
import { ActionMapper } from "../mappers";

export class ActionDatasourceImpl implements ActionDatasource {

     async addAction(addActionDto: AddActionDto): Promise<ActionEntity> {
          const { actionName } = addActionDto;
          try {
               // 1. Crear el action
               const action = await ActionsModel.create({ actionName: actionName })
               await action.save();

               // 2. Mapear la respuesta a la entidad
               return ActionMapper.actionEntityFromObject(action);

          } catch (error) {
               throw error;
          }
     }

     async deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity> {
          const { actionName } = deleteActionDto;
          let message: string = "No hay action que coincida con la consulta. Se eliminaron 0 actions."
          try {
               // 2. eliminar el action
               const result = await ActionsModel.deleteOne({ actionName: actionName })

               if (result.deletedCount === 1) {
                    message = "Action deleted successfully.";
               }
               else {
                    throw message
               }

               // 3. Mapear la respuesta a la entidad
               return ActionMapper.deleteActionEntityFromObject({ actionName, message });

          } catch (error) {
               throw error;
          }
     }

}