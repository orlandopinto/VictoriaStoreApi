import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { RegisterUserUseCase } from '../../interfaces/IAuthorization';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken, UserToken } from '../../types/auth.types';

export class RegisterUser implements RegisterUserUseCase {

     constructor(private readonly authRepository: AuthRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { }

     async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

          //crear el usuario
          const user = await this.authRepository.register(registerUserDto);

          // Token
          const token = await this.signToken({ id: user.id }, '2h')
          if (!token) {
               throw CustomError.internalServerError('Error generating token')
          }

          return {
               token: token,
               user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
               }
          }
     }
}