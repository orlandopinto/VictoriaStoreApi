import { JwtAdapter } from '../../../config';
import { RefreshTokenDto } from '../../dtos/auth';
import { CustomError } from '../../errors/custom.error';
import { RefreshTokenUseCase } from '../../interfaces/IAuth';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiResultResponse, SignToken } from '../../types';

export class RefreshToken implements RefreshTokenUseCase {

     constructor(
          private readonly authRepository: AuthRepository,
          private readonly signToken: SignToken = JwtAdapter.generateToken
     ) { }

     async execute(refreshTokenDto: RefreshTokenDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const environment = await this.authRepository.refresh(refreshTokenDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: environment,
                    message: null,
                    statusCode: 200,
                    stackTrace: null
               }

          } catch (error) {
               const err = error as Error
               let statusCode: number = 500;
               if (error instanceof CustomError) {
                    statusCode = error.statusCode;
               }
               resultResponse = {
                    status: "error",
                    hasError: true,
                    data: null,
                    message: err.message,
                    statusCode: statusCode,
                    stackTrace: err.stack
               }
          }
          return resultResponse;
     }
}