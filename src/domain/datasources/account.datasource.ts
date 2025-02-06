import { LoginSystemUserDto, RegisterSystemUserDto } from "../dtos/auth";
import { SystemUserEntity } from "../entities/system-user.entity";

export abstract class AccountDatasource {

     abstract login(loginSystemUserDto: LoginSystemUserDto): Promise<SystemUserEntity>
     abstract register(registerUserDto: RegisterSystemUserDto): Promise<SystemUserEntity>

}