import winston from 'winston';
const { combine, label, timestamp, printf } = winston.format;

export class AppLogger {
     logLevels = {
          error: 0,
          warn: 1,
          info: 2,
          debug: 4
     };

     formatLogger = printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
     });

     private logger = winston.createLogger({
          levels: this.logLevels,
          format: combine(
               label({ label: this.nameClass }),
               timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
               this.formatLogger
          ),
          transports: [new winston.transports.File({ filename: 'src/logs/logs.log' })]
     });

     constructor(private readonly nameClass: string) { }

     public Error = (error: Error) => {
          this.logger.error(`Error: ${error.message}, Name: ${error.name}, Stack: ${error.stack}`);
     }

     public Debug = (debugMessage: string) => {
          this.logger.debug(debugMessage);
     }

     public Info = (infoMessage: string) => {
          this.logger.info(infoMessage);
     }

     public Warn = (warnMessage: string) => {
          this.logger.warn(warnMessage);
     }
}