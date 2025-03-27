import { TaxDatasource } from "../../domain/datasources";
import { GetTaxesEntity } from "../../domain/entities";
import { TaxRepository } from "../../domain/repositories/tax.repository";

export class TaxRepositoryImpl implements TaxRepository {

     constructor(private readonly taxDatasource: TaxDatasource) { }

     getTaxes(): Promise<GetTaxesEntity> {
          return this.taxDatasource.getTaxes();
     }

}