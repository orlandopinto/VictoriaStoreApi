

import { AddProductVideoDto } from "../dtos/productVideos/add-product-video.dto"
import { DeleteProductVideoDto } from "../dtos/productVideos/delete-product-video.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddProductVideoUseCase {
     execute(addProductVideoDto: AddProductVideoDto): Promise<ApiResultResponse>
}

export interface DeleteProductVideoUseCase {
     execute(deleteProductVideoDto: DeleteProductVideoDto): Promise<ApiResultResponse>
}

export interface GetProductVideosUseCase {
     execute(): Promise<ApiResultResponse>
}
