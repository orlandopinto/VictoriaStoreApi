import { JwtAdapter } from '../../../config';
import { SignInUserDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { SignInUserUseCase } from '../../interfaces/IAuthorization';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken, SystemUserToken } from '../../types/auth.types';

export class SignInUser implements SignInUserUseCase {

     constructor(private readonly authRepository: AuthRepository, private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async execute(SignInUserDto: SignInUserDto): Promise<SystemUserToken> {

          // hacer login
          const user = await this.authRepository.signIn(SignInUserDto);

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