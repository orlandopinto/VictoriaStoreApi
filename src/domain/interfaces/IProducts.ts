import { AddProductDto, DeleteProductDto, UpdateProductDto } from "../dtos/products";

import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddProductUseCase {
     execute(addProductDto: AddProductDto): Promise<ApiResultResponse>
}

export interface UpdateProductUseCase {
     execute(updateProductDto: UpdateProductDto): Promise<ApiResultResponse>
}

export interface DeleteProductUseCase {
     execute(deleteProductDto: DeleteProductDto): Promise<ApiResultResponse>
}

export interface GetProductsUseCase {
     execute(): Promise<ApiResultResponse>
}
