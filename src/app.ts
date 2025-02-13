import { MONGO_DB_NAME, MONGO_URL, PORT } from './config/envs';
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/Server";

//NOTE: función autoinvocada, muy util para manejar funciones asincronas 
(() => {
     main();
})()

//WARNING: El puerto es opcional, si se quiere hacer declarativo colocar dentro de corchetes el puerto que se desea usar Server({4200})
// o tomarla de las variables de las variables de entorno
async function main() {

     await MongoDatabase.connect({ dbName: MONGO_DB_NAME, mongoUrl: MONGO_URL })

     new Server({ port: PORT ? 3500 : undefined, routes: AppRoutes.routes }).start()
}