import { AppLogger } from "../../config/appLogger";
import { AttributesModel, attributesSchema } from "../../data/mongodb";
import { AttributeDatasource } from "../../domain/datasources";
import { AddAttributeDto } from "../../domain/dtos/attributes/add-attribute.dto";
import { DeleteAttributeDto } from "../../domain/dtos/attributes/delete-attribute.dto";
import { UpdateAttributeDto } from "../../domain/dtos/attributes/update-attribute.dto";
import { AddAttributeEntity, DeleteAttributeEntity, GetAttributesEntity, UpdateAttributeEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";

export class AttributeDatasourceImpl implements AttributeDatasource {

     logger: AppLogger;

     constructor() {
          this.logger = new AppLogger("AttributeDatasourceImpl");
     }

     async addAttribute(addAttributeDto: AddAttributeDto): Promise<AddAttributeEntity> {

          const { _id, attributeName, attributeValue } = addAttributeDto;

          try {

               const attributes = await AttributesModel.findOne({ attributeName: attributeName, attributeValue: attributeValue })
               if (attributes) throw CustomError.badRequest(`the Attribute "${attributeName}" with the value "${attributeValue}" already exists.`)
               const result = await AttributesModel.create({ attributeName, attributeValue })
               await result.save();
               return new AddAttributeEntity(result._id.toString(), result.attributeName, result.attributeValue);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async updateAttribute(updateAttributeDto: UpdateAttributeDto): Promise<UpdateAttributeEntity> {
          const { _id, attributeName, attributeValue } = updateAttributeDto;
          try {

               const attributes = await AttributesModel.findOne({ attributeName: attributeName, attributeValue: attributeValue })
               if (attributes && attributes._id.toString() !== _id) throw CustomError.badRequest(`the Attribute "${attributeName}" with the value "${attributeValue}" already exists.`)

               const result = await AttributesModel.findByIdAndUpdate(
                    _id,
                    {
                         attributeName,
                         attributeValue
                    },
                    { new: true });

               if (!result)
                    throw CustomError.notFound('Attribute not found.');

               return new UpdateAttributeEntity(result._id.toString(), result.attributeName, result.attributeValue);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async deleteAttribute(deleteAttributeDto: DeleteAttributeDto): Promise<DeleteAttributeEntity> {

          const { _id } = deleteAttributeDto;
          try {
               const attributes = await AttributesModel.findOne({ _id: _id })
               if (!attributes) throw CustomError.badRequest("Attribute does not exist or has been deleted.")
               await AttributesModel.deleteOne({ _id: _id })
               return new DeleteAttributeEntity(attributes.attributeName);

          } catch (error) {
               this.logger.Error(error as Error);
               if (error instanceof CustomError) {
                    throw error;
               }
               throw error;
          }
     }

     async getAttributes(): Promise<GetAttributesEntity> {
          try {
               const result = await AttributesModel.find() as unknown as [typeof attributesSchema][]
               return new GetAttributesEntity(result);

          } catch (error) {
               this.logger.Error(error as Error);
               throw error;
          }
     }
}
