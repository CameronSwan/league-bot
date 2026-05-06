const winston = require('winston')
const fs = require('fs')
require('winston-daily-rotate-file')

const { combine, timestamp, printf, colorize } = winston.format
const logDir = process.env.LOG_DIR_NAME || 'logs'
const maxFiles = process.env.MAX_LOG_FILES ? isNaN(process.env.MAX_LOG_FILES) ? process.env.MAX_LOG_FILES : parseInt(process.env.MAX_LOG_FILES) : 10

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

const consoleLogTransport = new winston.transports.Console({
    format: combine(
        colorize(),
        printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}\n`
        }),
    ),
    level: process.env.CONSOLE_LOG_LEVEL || 'debug',
})

const primaryLogTransport = new winston.transports.DailyRotateFile({
    filename: `${logDir}/${process.env.PRIMARY_LOG_FILE_NAME || 'league-bot-primary'}_%DATE%.log`,
    datePattern: process.env.DATE_PATTERN || 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: process.env.LOG_FILE_MAX_SIZE || '7m',
    maxFiles: maxFiles,
})

const errorLogTransport = new winston.transports.DailyRotateFile({
    filename: `${logDir}/${process.env.ERROR_LOG_FILE_NAME || 'league-bot-error'}_%DATE%.log`,
    datePattern: process.env.DATE_PATTERN || 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: process.env.LOG_FILE_MAX_SIZE || '7m',
    maxFiles: maxFiles,
    level: 'error',
})

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
    ),
    transports: [
        consoleLogTransport,
        primaryLogTransport,
        errorLogTransport,
    ],
})

module.exports = logger