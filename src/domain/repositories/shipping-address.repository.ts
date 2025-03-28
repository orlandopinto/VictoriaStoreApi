import { AddShippingAddressDto } from "../dtos/shippingAddresses/add-shipping-address.dto";
import { DeleteShippingAddressDto } from "../dtos/shippingAddresses/delete-shipping-address.dto";
import { UpdateShippingAddressDto } from "../dtos/shippingAddresses/update-shipping-address.dto";

import { DeleteShippingAddressEntity, GetShippingAddressesEntity, AddShippingAddressEntity, UpdateShippingAddressEntity } from "../entities";

export abstract class ShippingAddressRepository {

     abstract addShippingAddress(addShippingAddressDto: AddShippingAddressDto): Promise<AddShippingAddressEntity>
     abstract updateShippingAddress(updateShippingAddressDto: UpdateShippingAddressDto): Promise<UpdateShippingAddressEntity>
     abstract deleteShippingAddress(deleteShippingAddressDto: DeleteShippingAddressDto): Promise<DeleteShippingAddressEntity>
     abstract getShippingAddresses(): Promise<GetShippingAddressesEntity>

}
