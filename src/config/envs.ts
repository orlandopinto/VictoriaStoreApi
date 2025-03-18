import 'dotenv/config';

export const PORT = process.env.PORT as string
export const MONGO_URL = process.env.MONGO_URL as string
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME as string
export const JWT_SEED = process.env.JWT_SEED as string
export const DURATION_TOKEN = '10m'
export const DURATION_REFRESH_TOKEN = '12h'

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME as string
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string
export const FOLDER_TO_UPLOAD = process.env.FOLDER_TO_UPLOAD as string
export const LOG_FOLDER = process.env.LOG_FOLDER as string
export const IMAGE_UPLOAD_PATH = process.env.IMAGE_UPLOAD_PATH as string