import { CustomError } from "../../errors/custom.error";
import { GetShippingAddressesUseCase } from "../../interfaces/IShippingAddress";
import { ShippingAddressRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class GetShippingAddresses implements GetShippingAddressesUseCase {

     constructor(private readonly shippingaddressRepository: ShippingAddressRepository) { }

     async execute(): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const shippingaddresses = await this.shippingaddressRepository.getShippingAddresses();
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: shippingaddresses,
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
