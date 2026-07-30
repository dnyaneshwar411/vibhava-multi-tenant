import { LogContext } from "./types.js";

export default class Logger {
  private contextName: string;
  private static isDev = process.env.NODE_ENV === "development";

  constructor(contextName: string = "App") {
    this.contextName = contextName;
  }

  public static forContext(contextName: string): Logger {
    return new Logger(contextName);
  }

  // --- Static Direct Methods (e.g., Logger.warn(...)) ---

  public static debug(message: string, meta?: LogContext): void {
    new Logger("App").debug(message, meta);
  }

  public static info(message: string, meta?: LogContext): void {
    new Logger("App").info(message, meta);
  }

  public static warn(message: string, meta?: LogContext): void {
    new Logger("App").warn(message, meta);
  }

  public static error(message: string, error?: Error | unknown, meta?: LogContext): void {
    new Logger("App").error(message, error, meta);
  }

  // --- Instance Methods ---

  public debug(message: string, meta?: LogContext): void {
    this.print("DEBUG", "\x1b[36m", message, meta);
  }

  public info(message: string, meta?: LogContext): void {
    this.print("INFO", "\x1b[32m", message, meta);
  }

  public warn(message: string, meta?: LogContext): void {
    this.print("WARN", "\x1b[33m", message, meta);
  }

  public error(message: string, error?: Error | unknown, meta?: LogContext): void {
    const errorMeta: LogContext = { ...meta };

    if (error instanceof Error) {
      errorMeta.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error !== undefined) {
      errorMeta.rawError = error;
    }

    this.print("ERROR", "\x1b[31m", message, errorMeta);
  }

  private print(level: string, color: string, message: string, meta?: LogContext): void {
    if (!Logger.isDev) return;

    const timestamp = new Date().toISOString();
    const resetColor = "\x1b[0m";
    const dimColor = "\x1b[2m";
    const boldColor = "\x1b[1m";

    const prefix = `${dimColor}[${timestamp}]${resetColor} ${color}${boldColor}[${level}]${resetColor} \x1b[35m[${this.contextName}]\x1b[0m:`;

    if (meta && Object.keys(meta).length > 0) {
      console.log(`${prefix} ${message}`, JSON.stringify(meta, null, 2));
    } else {
      console.log(`${prefix} ${message}`);
    }
  }
}