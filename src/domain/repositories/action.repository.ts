import { AddActionDto, DeleteActionDto } from "../dtos/permissions";
import { AddActionEntity, DeleteActionEntity, GetActionsEntity } from "../entities";

export abstract class ActionRepository {

     abstract addAction(addActionDto: AddActionDto): Promise<AddActionEntity>
     abstract deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity>
     abstract getActions(): Promise<GetActionsEntity>

}