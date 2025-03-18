import { DURATION_REFRESH_TOKEN, DURATION_TOKEN, JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { RegisterUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken } from '../../types';
import { UserToken } from '../../types/auth.type';

export class RegisterUser implements RegisterUserUseCase {

     constructor(
          private readonly authRepository: AuthRepository,
          private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

          //crear el usuario
          const user = await this.authRepository.register(registerUserDto);

          // Token
          const accessToken = await this.signToken({ id: user.id }, DURATION_TOKEN)
          const refreshToken = await this.signToken({ id: user.id }, DURATION_REFRESH_TOKEN)
          if (!accessToken || !refreshToken) {
               throw CustomError.internalServerError('Error generating token')
          }

          return {
               accessToken: accessToken,
               refreshToken: refreshToken,
               user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
               }
          }
     }
}