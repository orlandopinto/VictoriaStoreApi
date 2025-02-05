import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

type UserToken = {
     token: string;
     user: {
          id: string;
          name: string;
          email: string;
     }
}

interface LoginUserUseCase {
     execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

type SignToken = (payload: Object, duration?: any) => Promise<string | null>

export class LoginUser implements LoginUserUseCase {

     constructor(private readonly authRepository: AuthRepository, private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

          // hacer login
          const user = await this.authRepository.login(loginUserDto);

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