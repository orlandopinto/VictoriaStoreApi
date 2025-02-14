import { ActionDatasource } from "../../domain/datasources";
import { AddActionDto, DeleteActionDto } from "../../domain/dtos/roles-permissions";
import { DeleteActionEntity, ActionEntity } from "../../domain/entities";
import { ActionRepository } from "../../domain/repositories";

export class ActionsRepositoryImpl implements ActionRepository {

     constructor(private readonly actionDatasource: ActionDatasource) { }

     addAction(addActionDto: AddActionDto): Promise<ActionEntity> {
          return this.actionDatasource.addAction(addActionDto);
     }

     deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity> {
          return this.actionDatasource.deleteAction(deleteActionDto);
     }

}