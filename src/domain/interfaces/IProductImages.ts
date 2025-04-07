
import { AddProductImageDto } from "../dtos/productImages/add-product-image.dto"
import { DeleteProductImageDto } from "../dtos/productImages/delete-product-image.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddProductImageUseCase {
     execute(addProductImageDto: AddProductImageDto): Promise<ApiResultResponse>
}

export interface DeleteProductImageUseCase {
     execute(deleteProductImageDto: DeleteProductImageDto): Promise<ApiResultResponse>
}

export interface GetProductImagesUseCase {
     execute(): Promise<ApiResultResponse>
}
