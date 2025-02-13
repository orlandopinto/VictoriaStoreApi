import { JwtAdapter } from '../../../config';
import { SignInUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { SignInUserUseCase } from '../../interfaces/IAuthorization';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken, SystemUserToken } from '../../types/auth.types';

export class SignInUser implements SignInUserUseCase {

     constructor(private readonly authRepository: AuthRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { }

     async execute(SignInUserDto: SignInUserDto): Promise<SystemUserToken> {

          // hacer login
          const user = await this.authRepository.signIn(SignInUserDto);

          // Token
          const token = await this.signToken({ id: user.id }, '2h')
          if (!token) {
               throw CustomError.internalServerError('Error generating token')
          }

          //WARNING: Modificar la estructura que se necesita al hacer login
          //NOTE: Independientemente de los campos definidos en SystemUserToken, aqui se puede omitir los campos
          //      que retorna la api, siempre y cuando no sean obligatorios
          return {
               token: token,
               user: {
                    id: user.id,
                    email: user.email,
                    password: "******************",
                    address: user.address,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    imageProfilePath: user.imageProfilePath,
                    city: user.city,
                    zipcode: user.zipcode,
                    lockoutEnabled: user.lockoutEnabled,
                    accessFailedCount: user.accessFailedCount,
                    birthDate: user.birthDate,
                    roles: user.roles,
                    permissions: user.permissions
               }
          }
     }
}