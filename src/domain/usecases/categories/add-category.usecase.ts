import { AddCategoryDto } from "../../dtos/categories/add-category.dto";
import { CustomError } from "../../errors/custom.error";
import { AddCategoryUseCase } from "../../interfaces/ICategory";
import { CategoryRepository } from "../../repositories/category.repository";
import { ApiResultResponse } from "../../types";

export class AddCategory implements AddCategoryUseCase {

     constructor(private readonly categoryRepository: CategoryRepository) { }

     async execute(categoryDto: AddCategoryDto): Promise<ApiResultResponse> {

          let resultResponse: ApiResultResponse = {} as ApiResultResponse

          try {
               const category = await this.categoryRepository.addCategory(categoryDto);
               resultResponse = {
                    status: "success",
                    hasError: false,
                    data: category,
                    message: "Category created successfully",
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