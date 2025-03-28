import { AddAttributeDto } from "../dtos/attributes/add-attribute.dto"
import { DeleteAttributeDto } from "../dtos/attributes/delete-attribute.dto"
import { UpdateAttributeDto } from "../dtos/attributes/update-attribute.dto"
import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddAttributeUseCase {
     execute(addAttributeDto: AddAttributeDto): Promise<ApiResultResponse>
}

export interface UpdateAttributeUseCase {
     execute(updateAttributeDto: UpdateAttributeDto): Promise<ApiResultResponse>
}

export interface DeleteAttributeUseCase {
     execute(deleteAttributeDto: DeleteAttributeDto): Promise<ApiResultResponse>
}

export interface GetAttributesUseCase {
     execute(): Promise<ApiResultResponse>
}
