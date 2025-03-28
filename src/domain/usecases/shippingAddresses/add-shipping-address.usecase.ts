import { AddShippingAddressDto } from "../../dtos/shippingAddresses/add-shipping-address.dto";
import { CustomError } from "../../errors/custom.error";
import { AddShippingAddressUseCase } from "../../interfaces";
import { ShippingAddressRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddShippingAddress implements AddShippingAddressUseCase {

     constructor(private readonly shippingaddressRepository: ShippingAddressRepository) { }

     async execute(addShippingAddressDto: AddShippingAddressDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const shippingaddress = await this.shippingaddressRepository.addShippingAddress(addShippingAddressDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: shippingaddress,
                    message: "Shipping address created successfully",
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
