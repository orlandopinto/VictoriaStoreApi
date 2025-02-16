import { AuthorizationDatasource } from "../../domain/datasources";
import { AddAuthorizationDto, DeleteAuthorizationDto } from "../../domain/dtos/roles-permissions";
import { AddAuthorizationEntity, DeleteAuthorizationEntity, GetAuthorizationEntity } from "../../domain/entities";
import { AuthorizationRepository } from "../../domain/repositories";

export class AuthorizationRepositoryImpl implements AuthorizationRepository {

     constructor(private readonly authorizationDatasource: AuthorizationDatasource) { }

     addAuthorization(addAuthorizationDto: AddAuthorizationDto): Promise<AddAuthorizationEntity> {
          return this.authorizationDatasource.addAuthorization(addAuthorizationDto);
     }

     deleteAuthorization(deleteAuthorizationDto: DeleteAuthorizationDto): Promise<DeleteAuthorizationEntity> {
          return this.authorizationDatasource.deleteAuthorization(deleteAuthorizationDto);
     }

     getAuthorizations(): Promise<GetAuthorizationEntity> {
          return this.authorizationDatasource.getAuthorizations();
     }

}