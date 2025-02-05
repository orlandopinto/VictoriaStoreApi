import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
     PORT: get('PORT').required().asPortNumber(),
     MONGO_URL: get('MONGO_URL').required().asString(),
     MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
     // MONGO_USER: env.get('MONGO_USER').required().asString(),
     // MONGO_PASS: env.get('MONGO_PASS').required().asString(),
}