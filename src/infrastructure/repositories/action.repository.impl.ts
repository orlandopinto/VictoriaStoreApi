import { ActionDatasource } from "../../domain/datasources";
import { AddActionDto, DeleteActionDto } from "../../domain/dtos/permissions";
import { DeleteActionEntity, AddActionEntity, GetActionsEntity } from "../../domain/entities";
import { ActionRepository } from "../../domain/repositories";

export class ActionRepositoryImpl implements ActionRepository {

     constructor(private readonly actionDatasource: ActionDatasource) { }

     addAction(addActionDto: AddActionDto): Promise<AddActionEntity> {
          return this.actionDatasource.addAction(addActionDto);
     }

     deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity> {
          return this.actionDatasource.deleteAction(deleteActionDto);
     }

     getActions(): Promise<GetActionsEntity> {
          return this.actionDatasource.getActions();
     }

}