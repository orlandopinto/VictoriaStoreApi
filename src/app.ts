import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/Server";

//función autoinvocada, muy util para manejar funciones asincronas 
(() => {
     main();
})()

//El puerto es opcional, si se quiere hacer declarativo colocar dentro de corchetes el puerto que se desea usar Server({4200})
// o tomarla de las variables de las variables de entorno
async function main() {
     new Server({
          port: 3000,//envs.PORT
          routes: AppRoutes.routes
     }).start()
}