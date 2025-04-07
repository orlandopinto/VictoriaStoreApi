
export class AddSystemUserDto {
	constructor(

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

	static create(object: { [key: string]: any }): [string?, AddSystemUserDto?] {
		const { _id, email, password, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, address, birthDate, roles, isActive } = object;

		if (email === undefined) return ['Missing email on create user'];
		if (password === undefined) return ['Missing password on create user'];
		if (firstName === undefined) return ['Missing firstName  on create user'];
		if (lastName === undefined) return ['Missing lastName  on create user'];
		if (phoneNumber === undefined) return ['Missing phoneNumber  on create user'];
		if (public_id === undefined) return ['Missing public_id  on create user'];
		if (secure_url === undefined) return ['Missing secure_url  on create user'];
		if (city === undefined) return ['Missing city  on create user'];
		if (zipcode === undefined) return ['Missing zipcode on create user'];
		if (lockoutEnabled === undefined) return ['Missing lockoutEnabled on create user'];
		if (accessFailedCount === undefined) return ['Missing accessFailedCounton create user'];
		if (address === undefined) return ['Missing address  on create user'];
		if (birthDate === undefined) return ['Missing birthDate Date  on create user'];
		if (roles === undefined) return ['Missing roles[]  on create user'];
		if (isActive === undefined) return ['Missing isActive on create user'];

		return [
			undefined,
			new AddSystemUserDto(_id, email, password, firstName, lastName, phoneNumber, public_id, secure_url, city, zipcode, lockoutEnabled, accessFailedCount, address, birthDate, roles, isActive)
		];
	}
}
