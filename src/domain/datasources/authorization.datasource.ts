import { AddAuthorizationDto, DeleteAuthorizationDto } from "../dtos/roles-permissions/index";
import { AddAuthorizationEntity, DeleteAuthorizationEntity, GetAuthorizationEntity } from "../entities";

export abstract class AuthorizationDatasource {

     //TODO: Modificar addAuthorization y getAuthorizations, para que devuelva
     abstract addAuthorization(addAuthorizationDto: AddAuthorizationDto): Promise<AddAuthorizationEntity>
     abstract deleteAuthorization(deleteAuthorizationDto: DeleteAuthorizationDto): Promise<DeleteAuthorizationEntity>
     abstract getAuthorizations(): Promise<GetAuthorizationEntity>

}