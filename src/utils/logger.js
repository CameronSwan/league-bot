const winston = require('winston')
const fs = require('fs')
const path = require('path')
require('winston-daily-rotate-file')

const createLogger = (source) => {

    const baseFormat = winston.format.combine(
        winston.format.label({ label: source}),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ timestamp, label, level, message, stack, ...meta }) => {

            let logString = `[${timestamp}]`
            logString += ` [${level}]`.padEnd(21, ' ')
            logString += `[${label}]`.padEnd(12, ' ')
            if (meta.type) logString += `[${meta.type}]`.padEnd(14, ' ')

            if (stack) return logString += `${stack}`

            if (meta.channel) logString += `Channel: ${meta.channel} | `
            if (meta.user) logString += `User: ${meta.user}`
            if (meta.user && (meta.command || message)) logString += ' | '
            if (meta.command) logString += `Command: /${meta.command}`
            if (meta.command && message) logString += ' | '
            if (message) logString += `${message}`

            return logString
        })
    )

    const consoleTransport = new winston.transports.Console({
        level: process.env.CONSOLE_LOG_LEVEL || 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            baseFormat,
        )
    })

    const logDirectory = process.env.LOG_DIR_NAME || 'logs'

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true })
    }

    const logFile = path.join(logDirectory, `%DATE%-${process.env.LOG_FILE_NAME || '%DATE%-league-bot.log'}`)

    const fileRotateTransport = new winston.transports.DailyRotateFile({
        level: process.env.FILE_LOG_LEVEL || 'info',
        filename: logFile,
        maxSize: process.env.MAX_LOG_SIZE || '7m',
        maxFiles: parseInt(process.env.MAX_LOG_FILES || '10'),
        zippedArchive: true,
        datePattern: 'YYYY-MM-DD',
        format: baseFormat,
    })

    return winston.createLogger({
        level: 'debug',
        transports: [
            consoleTransport,
            fileRotateTransport,
        ]
    });
}

module.exports = createLogger