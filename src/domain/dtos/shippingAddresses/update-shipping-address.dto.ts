export class UpdateShippingAddressDto {

	private constructor(

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

	static update(object: { [key: string]: any }): [string?, UpdateShippingAddressDto?] {

		const requiredFields = ['_id', 'firstName', 'lastName', 'phoneNumber', 'address', 'province', 'city', 'state', 'zipCode', 'country', 'isDefault'];
		for (const field of requiredFields) {
			if (object[field] === undefined) return [`Missing ${field} on update ShippingAddress`];
		}

		return [
			undefined,
			new UpdateShippingAddressDto(
				object._id,
				object.firstName,
				object.lastName,
				object.phoneNumber,
				object.address,
				object.province,
				object.city,
				object.state,
				object.zipCode,
				object.country,
				object.isDefault
			)
		];
	}
}
