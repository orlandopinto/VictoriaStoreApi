import { userData } from "../types";
import { systemUsersSchema } from "../../data/mongodb/models/system-users.model";

export class AddSystemUserEntity {

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

}

export class UpdateSystemUserEntity {

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
		public isActive: boolean,
		public createdAt?: string,
		public updatedAt?: string

	) { }

}

export class SystemUserEntity {

	constructor(
		public id: string,
		public email: string,
		public password: string,
		public address?: string,
		public firstName?: string,
		public lastName?: string,
		public phoneNumber?: string,
		public public_id?: string,
		public secure_url?: string,
		public city?: string,
		public zipcode?: number,
		public lockoutEnabled?: boolean,
		public accessFailedCount?: number,
		public birthDate?: Date,
		public roles?: string[],
		public isActive?: boolean,
		public createdAt?: string,
		public updatedAt?: string
	) { }

}

export class DeleteSystemUserEntity {

	constructor(public email: string) { }

}

export class GetSystemUsersEntity {

	constructor(public systemUsers: [typeof systemUsersSchema][]) { }

}

export class EnvironmentSystemUserEntity {

	constructor(
		public accessToken: string,
		public refreshToken: string,
		public userData: userData
	) { }

}

export class RefreshTokenEntity {

	constructor(
		public email: string,
		public accessToken: string,
		public refreshToken: string
	) { }

}

export class ChangePasswordEntity {

	constructor(
		public email: string,
		public newPasswod: string,
	) { }

}
