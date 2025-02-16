import { AddAuthorizationDto, DeleteAuthorizationDto } from "../dtos/roles-permissions";
import { AddAuthorizationEntity, DeleteAuthorizationEntity, GetAuthorizationEntity } from "../entities";

export abstract class AuthorizationRepository {

     abstract addAuthorization(addAuthorizationDto: AddAuthorizationDto): Promise<AddAuthorizationEntity>
     abstract deleteAuthorization(deleteAuthorizationDto: DeleteAuthorizationDto): Promise<DeleteAuthorizationEntity>
     abstract getAuthorizations(): Promise<GetAuthorizationEntity>

}