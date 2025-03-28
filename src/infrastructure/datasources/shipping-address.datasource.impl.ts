import { AddShippingAddressDto } from "../../domain/dtos/shippingAddresses/add-shipping-address.dto";
import { DeleteShippingAddressDto } from "../../domain/dtos/shippingAddresses/delete-shipping-address.dto";
import { UpdateShippingAddressDto } from "../../domain/dtos/shippingAddresses/update-shipping-address.dto";
import { AppLogger } from "../../config/appLogger";
import { ShippingAddressModel, shippingAddressSchema } from "../../data/mongodb/models/shipping-address.models";
import { ShippingAddressDatasource } from "../../domain/datasources";
import { AddShippingAddressEntity, DeleteShippingAddressEntity, GetShippingAddressesEntity, UpdateShippingAddressEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class ShippingAddressDatasourceImpl implements ShippingAddressDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("ShippingAddressDatasourceImpl");
     }

     async addShippingAddress(addShippingAddressDto: AddShippingAddressDto): Promise<AddShippingAddressEntity> {

          const { _id, firstName, lastName, phoneNumber, address, province, city, state, zipCode, country, isDefault } = addShippingAddressDto;

          try {

               const shippingaddress = await ShippingAddressModel.findOne({ _id: _id })
               if (shippingaddress) throw CustomError.badRequest('ShippingAddress already exists.')
               const result = await ShippingAddressModel.create({ _id, firstName, lastName, phoneNumber, address, province, city, state, zipCode, country, isDefault })
               await result.save();
               return new AddShippingAddressEntity(result._id.toString(), result.firstName, result.lastName, result.phoneNumber, result.address, result.province, result.city, result.state, result.zipCode, result.country, result.isDefault,);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateShippingAddress(updateShippingAddressDto: UpdateShippingAddressDto): Promise<UpdateShippingAddressEntity> {
          const { _id, firstName, lastName, phoneNumber, address, province, city, state, zipCode, country, isDefault } = updateShippingAddressDto;
          try {
               const result = await ShippingAddressModel.findByIdAndUpdate(
                    _id,
                    {
                         _id, firstName, lastName, phoneNumber, address, province, city, state, zipCode, country, isDefault
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('ShippingAddress not found.');

               return new UpdateShippingAddressEntity(result._id.toString(), result.firstName, result.lastName, result.phoneNumber, result.address, result.province, result.city, result.state, result.zipCode, result.country, result.isDefault,);
               //Agregar si es necesario result.createdAt as unknown as string, result.updatedAt as unknown as string);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteShippingAddress(deleteShippingAddressDto: DeleteShippingAddressDto): Promise<DeleteShippingAddressEntity> {

          const { _id } = deleteShippingAddressDto;
          try {
               const shippingaddress = await ShippingAddressModel.findOne({ _id: _id })
               if (!shippingaddress) throw CustomError.badRequest("ShippingAddress does not exist or has been deleted.")
               await ShippingAddressModel.deleteOne({ _id: _id })
               //NOTE: Corregir la siguiente linea
               return new DeleteShippingAddressEntity(_id);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getShippingAddresses(): Promise<GetShippingAddressesEntity> {
          try {
               const result = await ShippingAddressModel.find() as unknown as [typeof shippingAddressSchema][]
               return new GetShippingAddressesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
