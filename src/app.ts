import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/Server";

//función autoinvocada, muy util para manejar funciones asincronas 
(() => {
     main();
})()

//El puerto es opcional, si se quiere hacer declarativo colocar dentro de corchetes el puerto que se desea usar Server({4200})
// o tomarla de las variables de las variables de entorno
async function main() {

     await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoUrl: envs.MONGO_URL })

     new Server({ port: envs.PORT && 3000, routes: AppRoutes.routes }).start()
}