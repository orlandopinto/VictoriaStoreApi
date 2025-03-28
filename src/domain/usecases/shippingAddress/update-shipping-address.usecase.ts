import { UpdateShippingAddressDto } from "../../dtos/shippingAddresses/update-shipping-address.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateShippingAddressUseCase } from "../../interfaces/IShippingAddress";
import { ShippingAddressRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateShippingAddress implements UpdateShippingAddressUseCase {

     constructor(private readonly shippingaddressRepository: ShippingAddressRepository) { }

     async execute(updateShippingAddressDto: UpdateShippingAddressDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const shippingaddress = await this.shippingaddressRepository.updateShippingAddress(updateShippingAddressDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: shippingaddress,
                    message: "Shipping address updated successfully",
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
