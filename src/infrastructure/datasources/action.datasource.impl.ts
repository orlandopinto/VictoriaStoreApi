import { ActionsModel, actionsSchema } from "../../data/mongodb";
import { ActionDatasource } from "../../domain/datasources";
import { AddActionDto, DeleteActionDto } from "../../domain/dtos/permissions";
import { AddActionEntity, DeleteActionEntity, GetActionsEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ActionDatasourceImpl implements ActionDatasource {

     async addAction(addActionDto: AddActionDto): Promise<AddActionEntity> {
          const { actionName, hasError, errorMessage } = addActionDto;
          try {
               // 1. Crear el action
               const action = await ActionsModel.create({ actionName: actionName })
               await action.save();

               // 2. Mapear la respuesta a la entidad
               return new AddActionEntity(action.id, actionName, hasError, errorMessage);

          } catch (error) {
               throw error;
          }
     }

     async deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity> {
          const { actionName, hasError, errorMessage } = deleteActionDto;
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

     async getActions(): Promise<GetActionsEntity> {
          try {

               const actions = await ActionsModel.find() as unknown as [typeof actionsSchema][]

               return new GetActionsEntity(actions);

          } catch (error) {
               if (error instanceof CustomError) {
                    throw error;
               }
               throw CustomError.internalServerError();
          }
     }




}