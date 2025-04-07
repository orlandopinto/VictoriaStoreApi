
import { AddAttributeValueDto, UpdateAttributeValueDto, DeleteAttributeValueDto } from "../dtos/attributeValues"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddAttributeValueUseCase {
     execute(addAttributeValueDto: AddAttributeValueDto): Promise<ApiResultResponse>
}

export interface UpdateAttributeValueUseCase {
     execute(updateAttributeValueDto: UpdateAttributeValueDto): Promise<ApiResultResponse>
}

export interface DeleteAttributeValueUseCase {
     execute(deleteAttributeValueDto: DeleteAttributeValueDto): Promise<ApiResultResponse>
}

export interface GetAttributeValuesUseCase {
     execute(): Promise<ApiResultResponse>
}
