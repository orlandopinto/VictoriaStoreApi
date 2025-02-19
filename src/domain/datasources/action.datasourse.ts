import { AddActionDto, DeleteActionDto } from "../dtos/permissions/index";
import { DeleteActionEntity, AddActionEntity, GetActionsEntity } from "../entities";

export abstract class ActionDatasource {

     abstract addAction(addActionDto: AddActionDto): Promise<AddActionEntity>
     abstract deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity>
     abstract getActions(): Promise<GetActionsEntity>

}