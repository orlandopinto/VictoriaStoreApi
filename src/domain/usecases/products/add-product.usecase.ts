import { AddProductDto } from "../../dtos/products/add-product.dto";
import { CustomError } from "../../errors/custom.error";
import { AddProductUseCase } from "../../interfaces";
import { ProductRepository } from "../../repositories";
import { ApiResultResponse } from "../../types";

export class AddProduct implements AddProductUseCase {

     constructor(private readonly productRepository: ProductRepository) { }

     async execute(addProductDto: AddProductDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const product = await this.productRepository.addProduct(addProductDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: product,
                    message: "Product created successfully",
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
