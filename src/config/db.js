const mongoose = require('mongoose')
const logger = require('../utils/logger')('DATABASE')
const handleError = require('../utils/handleError')

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            handleError('MONGO_URI is not defined.', logger, true)
        }
        mongoose.connection.on('connected', () => {
            logger.info(`Database connection successful. Host: ${mongoose.connection.name}`, {
                type: 'SYSTEM',
            })
        })
        mongoose.connection.on('error', (e) => {
            handleError(e, logger, true)
        })
        mongoose.connection.on('disconnected', () => {
            logger.warn('Database connection closed.', {
                type: 'SYSTEM',
            })
        })
        logger.info('Attempting to connect to database...', {
            type: 'SYSTEM',
        })
        await mongoose.connect(process.env.MONGO_URI)
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close()
                logger.info('Client shutting down.', {
                    type: 'SYSTEM'
                })
                process.exit(0)
            } catch (e) {
                handleError(e, logger, true)
            }
        })
    } catch (e) {
        await handleError(e, logger, true)
    }
}

module.exports = connectDB