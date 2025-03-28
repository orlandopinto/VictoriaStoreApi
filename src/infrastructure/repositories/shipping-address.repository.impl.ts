import { ShippingAddressDatasource } from "../../domain/datasources";
import { AddShippingAddressDto } from "../../domain/dtos/shippingAddresses/add-shipping-address.dto";
import { DeleteShippingAddressDto } from "../../domain/dtos/shippingAddresses/delete-shipping-address.dto";
import { UpdateShippingAddressDto } from "../../domain/dtos/shippingAddresses/update-shipping-address.dto";
import { AddShippingAddressEntity, DeleteShippingAddressEntity, GetShippingAddressesEntity, UpdateShippingAddressEntity } from "../../domain/entities/shipping-address.entity";
import { ShippingAddressRepository } from "../../domain/repositories";

export class ShippingAddressRepositoryImpl implements ShippingAddressRepository {

     constructor(private readonly shippingaddressDatasource: ShippingAddressDatasource) { }

     addShippingAddress(addShippingAddressDto: AddShippingAddressDto): Promise<AddShippingAddressEntity> {
          return this.shippingaddressDatasource.addShippingAddress(addShippingAddressDto);
     }

     updateShippingAddress(updateShippingAddressDto: UpdateShippingAddressDto): Promise<UpdateShippingAddressEntity> {
          return this.shippingaddressDatasource.updateShippingAddress(updateShippingAddressDto);
     }

     deleteShippingAddress(deleteShippingAddressDto: DeleteShippingAddressDto): Promise<DeleteShippingAddressEntity> {
          return this.shippingaddressDatasource.deleteShippingAddress(deleteShippingAddressDto);
     }

     getShippingAddresses(): Promise<GetShippingAddressesEntity> {
          return this.shippingaddressDatasource.getShippingAddresses();
     }

}
