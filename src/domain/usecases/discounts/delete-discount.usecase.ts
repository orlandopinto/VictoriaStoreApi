import { DeleteDiscountDto } from "../../dtos/discounts/delete-discount.dto";
import { CustomError } from "../../errors/custom.error";
import { DeleteDiscountUseCase } from "../../interfaces/IDiscounts";
import { DiscountRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class DeleteDiscount implements DeleteDiscountUseCase {

     constructor(private readonly discountRepository: DiscountRepository) { }

     async execute(deleteDiscountDto: DeleteDiscountDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const discount = await this.discountRepository.deleteDiscount(deleteDiscountDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: discount,
                    message: "Discount deleted successfully",
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