import { UpdateDiscountDto } from "../../dtos/discounts/update-discount.dto";
import { CustomError } from "../../errors/custom.error";
import { UpdateDiscountUseCase } from "../../interfaces/IDiscounts";
import { DiscountRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class UpdateDiscount implements UpdateDiscountUseCase {

     constructor(private readonly discountRepository: DiscountRepository) { }

     async execute(updateDiscountDto: UpdateDiscountDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const discount = await this.discountRepository.updateDiscount(updateDiscountDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: discount,
                    message: "Discount updated successfully",
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