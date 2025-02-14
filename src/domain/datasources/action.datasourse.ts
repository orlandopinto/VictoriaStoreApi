import { AddActionDto, DeleteActionDto } from "../dtos/roles-permissions/index";
import { DeleteActionEntity, ActionEntity } from "../entities";

export abstract class ActionDatasource {

     abstract addAction(addActionDto: AddActionDto): Promise<ActionEntity>
     abstract deleteAction(deleteActionDto: DeleteActionDto): Promise<DeleteActionEntity>

}