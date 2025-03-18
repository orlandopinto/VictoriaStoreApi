import { DURATION_REFRESH_TOKEN, DURATION_TOKEN, JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { LoginUserUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { SignToken } from '../../types';
import { UserToken } from '../../types/auth.type';

export class LoginUser implements LoginUserUseCase {

     constructor(
          private readonly authRepository: AuthRepository,
          private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

          // hacer login
          const user = await this.authRepository.login(loginUserDto);

          // Token
          const accessToken = await this.signToken({ email: user.email }, DURATION_TOKEN)
          const refreshToken = await this.signToken({ email: user.email }, DURATION_REFRESH_TOKEN)
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