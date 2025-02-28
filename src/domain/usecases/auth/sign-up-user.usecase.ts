import { DURATION_TOKEN, JwtAdapter } from '../../../config';
import { SignUpUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { SignUpUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken, SystemUser } from '../../types';

export class SignUpUser implements SignUpUserUseCase {

     constructor(
          private readonly authRepository: AuthRepository,
          private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async execute(signUpUserDto: SignUpUserDto): Promise<SystemUser> {

          //crear el usuario
          const user = await this.authRepository.signUp(signUpUserDto);

          // Token
          const token = await this.signToken({ id: user.id }, DURATION_TOKEN)
          if (!token) {
               throw CustomError.internalServerError('Error generating token')
          }

          //WARNING: Modificar la estructura que se necesita al hacer login
          return {
               token: token,
               user: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
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
                    roles: user.roles
               }
          }
     }
}