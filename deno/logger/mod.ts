import * as log from "https://deno.land/std@0.183.0/log/mod.ts";

type LoggerNames = "api";

export function setupLogger() {
  log.setup({
    handlers: {
      consoleLog: new log.handlers.ConsoleHandler("DEBUG", {
        formatter: ({
          datetime: originalDatetime,
          levelName,
          loggerName,
          msg,
          args,
        }) => {
          const datetime = originalDatetime.toLocaleString();
          const stringifyArgs = args[0] ? JSON.stringify(args[0], null, 2) : "";
          const formattedMsg = `${datetime} [${loggerName}] [${levelName}] ${msg} ${stringifyArgs}`;

          return formattedMsg;
        },
      }),

      anotherFmt: new log.handlers.ConsoleHandler("DEBUG", {
        formatter: "[{loggerName}] - {levelName} {msg}",
      }),
    },

    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["consoleLog"],
      },
      api: {
        level: "DEBUG",
        handlers: ["consoleLog"],
      },
    } as Record<LoggerNames | "default", log.LoggerConfig>,
  });
}

export function getLogger(name: LoggerNames) {
  return log.getLogger(name);
}
