const winston = require('winston');

const createLogger = (source) => {
    return winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.label({ label: source}),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, label, level, message, stack, ...meta }) => {

                let logString = `[${timestamp}]`
                logString = logString += ` [${level}]`
                logString = logString += ` [${label}]`.padEnd(12, ' ')

                if (meta.type) logString += `[${meta.type}]`.padEnd(14, ' ')
                else if (meta.channel && meta.type === 'VOICE') logString += 'Voice '
                if (meta.channel) logString += `Channel: ${meta.channel} | `
                if (meta.user) logString += `User: ${meta.user}`
                if (meta.user && (meta.command || message)) logString += ' | '
                if (meta.command) logString += `Command: /${meta.command}`
                if (meta.command && message) logString += ' | '
                if (message) logString += `${message}`

                return logString
            })
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
}

module.exports = createLogger;