import { AddAccessDto, DeleteAccessDto } from "../dtos/roles-permissions/index";
import { AddAccessEntity, DeleteAccessEntity, GetAccessEntity } from "../entities";

export abstract class AccessDatasource {

     //TODO: Modificar addAccess y getAccesss, para que devuelva
     abstract addAccess(addAccessDto: AddAccessDto): Promise<AddAccessEntity>
     abstract deleteAccess(deleteAccessDto: DeleteAccessDto): Promise<DeleteAccessEntity>
     abstract getAccesss(): Promise<GetAccessEntity>

}