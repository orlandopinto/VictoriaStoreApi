import { AddActionDto, DeleteActionDto } from "../dtos/roles-permissions";
import { ActionEntity, DeleteActionEntity } from "../entities";

export abstract class ActionRepository {

     abstract addAction(addActionDto: AddActionDto): Promise<ActionEntity>
     abstract deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity>

}