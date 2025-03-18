import { RefreshTokenType } from "./system-user.type"

export type SignToken = (payload: Object, duration?: any) => Promise<string | null>
export type VerifyRefreshToken = (email: string, refreshToken: string) => Promise<RefreshTokenType | string | null>