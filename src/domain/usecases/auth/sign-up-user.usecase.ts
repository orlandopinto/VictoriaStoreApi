import { JwtAdapter } from '../../../config';
import { SignUpUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { SignUpUserUseCase } from '../../interfaces/IAuthorization';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken, SystemUserToken } from '../../types/auth.types';

export class SignUpUser implements SignUpUserUseCase {

     constructor(private readonly authRepository: AuthRepository, private readonly signToken: SignToken = JwtAdapter.generateToken) { }

     async execute(signUpUserDto: SignUpUserDto): Promise<SystemUserToken> {

          //crear el usuario
          const user = await this.authRepository.signUp(signUpUserDto);

          // Token
          const token = await this.signToken({ id: user.id }, '2h')
          if (!token) {
               throw CustomError.internalServerError('Error generating token')
          }

          return {
               token: token,
               user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
               }
          }
     }
}