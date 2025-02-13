import 'dotenv/config';

export const PORT = process.env.PORT as string
export const MONGO_URL = process.env.MONGO_URL as string
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string
export const JWT_SEED = process.env.JWT_SEED as string