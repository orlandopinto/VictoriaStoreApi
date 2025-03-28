import { DeleteShippingAddressDto } from "../../dtos/shippingAddresses/delete-shipping-address.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteShippingAddressUseCase } from "../../interfaces/IShippingAddress";
import { ShippingAddressRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteShippingAddress implements DeleteShippingAddressUseCase {

     constructor(private readonly shippingaddressRepository: ShippingAddressRepository) { }

     async execute(deleteShippingAddressDto: DeleteShippingAddressDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const shippingaddress = await this.shippingaddressRepository.deleteShippingAddress(deleteShippingAddressDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: shippingaddress,
                    message: "Shipping address deleted successfully",
                    statusCode: 201,
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
