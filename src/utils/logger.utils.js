import { createLogger, format, transports, addColors } from 'winston';

// Define custom logging format
const customFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, meta }) => {
    return `${timestamp} [${level}]: ${message} ${meta ? `~ ${JSON.stringify(meta)}` : ''}`;
  })
);

// Define logger
const logger = createLogger({
  level: 'debug', 
  format: customFormat,
  transports: [
    new transports.Console()
  ],
});

export default logger; 
