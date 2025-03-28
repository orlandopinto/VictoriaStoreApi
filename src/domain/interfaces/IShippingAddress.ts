import { AddShippingAddressDto } from "../dtos/shippingAddresses/add-shipping-address.dto";
import { DeleteShippingAddressDto } from "../dtos/shippingAddresses/delete-shipping-address.dto";
import { UpdateShippingAddressDto } from "../dtos/shippingAddresses/update-shipping-address.dto";

import { ApiResultResponse } from "../types/api-result-response.type"

export interface AddShippingAddressUseCase {
     execute(addShippingAddressDto: AddShippingAddressDto): Promise<ApiResultResponse>
}

export interface UpdateShippingAddressUseCase {
     execute(updateShippingAddressDto: UpdateShippingAddressDto): Promise<ApiResultResponse>
}

export interface DeleteShippingAddressUseCase {
     execute(deleteShippingAddressDto: DeleteShippingAddressDto): Promise<ApiResultResponse>
}

export interface GetShippingAddressesUseCase {
     execute(): Promise<ApiResultResponse>
}
