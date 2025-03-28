
export class AddShippingAddressDto {
	constructor(

		public _id: string,
		public firstName: string,
		public lastName: string,
		public phoneNumber: string,
		public address: string,
		public province: string,
		public city: string,
		public state: string,
		public zipCode: string,
		public country: string,
		public isDefault: boolean

	) { }

	static create(object: { [key: string]: any }): [string?, AddShippingAddressDto?] {
		const { _id, firstName, lastName, phoneNumber, address, province, city, state, zipCode, country, isDefault } = object;

		if (_id === undefined) return ['Missing   _id on create shippingaddress'];
		if (firstName === undefined) return ['Missing   firstName on create shippingaddress'];
		if (lastName === undefined) return ['Missing   lastName on create shippingaddress'];
		if (phoneNumber === undefined) return ['Missing   phoneNumber on create shippingaddress'];
		if (address === undefined) return ['Missing   address on create shippingaddress'];
		if (province === undefined) return ['Missing   province on create shippingaddress'];
		if (city === undefined) return ['Missing   city on create shippingaddress'];
		if (state === undefined) return ['Missing   state on create shippingaddress'];
		if (zipCode === undefined) return ['Missing   zipCode on create shippingaddress'];
		if (country === undefined) return ['Missing   country on create shippingaddress'];
		if (isDefault === undefined) return ['Missing   isDefault on create shippingaddress'];

		return [
			undefined,
			new AddShippingAddressDto(_id, firstName, lastName, phoneNumber, address, province, city, state, zipCode, country, isDefault)
		];
	}
}
