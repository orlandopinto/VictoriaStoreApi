import { AddDiscountDto } from "../../dtos/discounts/add-discount.dto";
import { CustomError } from "../../errors/custom.error";
import { AddDiscountUseCase } from "../../interfaces";
import { DiscountRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddDiscount implements AddDiscountUseCase {

     constructor(private readonly discountRepository: DiscountRepository) { }

     async execute(addDiscountDto: AddDiscountDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const discount = await this.discountRepository.addDiscount(addDiscountDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: discount,
                    message: "Discount created successfully",
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