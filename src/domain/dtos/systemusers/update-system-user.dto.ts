export class UpdateSystemUserDto {

	private constructor(

		public _id: string,
		public email: string,
		public password: string,
		public firstName: string | null,
		public lastName: string | null,
		public phoneNumber: string | null,
		public public_id: string | null,
		public secure_url: string | null,
		public city: string | null,
		public zipcode: number | null,
		public lockoutEnabled: boolean,
		public accessFailedCount: number,
		public address: string | null,
		public birthDate: Date | null,
		public roles: string[] | null,
		public isActive: boolean

	) { }

	static update(object: { [key: string]: any }): [string?, UpdateSystemUserDto?] {

		const requiredFields = ['_id', 'email', 'password', 'firstName', 'lastName', 'phoneNumber', 'public_id', 'secure_url', 'city', 'zipcode', 'lockoutEnabled', 'accessFailedCount', 'address', 'birthDate', 'roles', 'isActive'];
		for (const field of requiredFields) {
			if (object[field] === undefined) return [`Missing ${field} on update SystemUser`];
		}

		return [
			undefined,
			new UpdateSystemUserDto(
				object._id,
				object.email,
				object.password,
				object.firstName,
				object.lastName,
				object.phoneNumber,
				object.public_id,
				object.secure_url,
				object.city,
				object.zipcode,
				object.lockoutEnabled,
				object.accessFailedCount,
				object.address,
				object.birthDate,
				object.roles,
				object.isActive
			)
		];
	}
}
