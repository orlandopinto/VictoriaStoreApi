import { AddAccessDto, DeleteAccessDto } from "../dtos/roles-permissions";
import { AddAccessEntity, DeleteAccessEntity, GetAccessEntity } from "../entities";

export abstract class AccessRepository {

     abstract addAccess(addAccessDto: AddAccessDto): Promise<AddAccessEntity>
     abstract deleteAccess(deleteAccessDto: DeleteAccessDto): Promise<DeleteAccessEntity>
     abstract getAccesss(): Promise<GetAccessEntity>

}