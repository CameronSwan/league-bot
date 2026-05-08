const mongoose = require('mongoose')
const logger = require('../utils/logger')('DATABASE')

const connectDB = async () => {
    try {

        logger.info('Attempting to connect to database...', {
            type: 'SYSTEM',
        })
        await mongoose.connect(process.env.MONGO_URI)

        logger.info('Database connection successful.', {
            type: 'SYSTEM'
        })

    } catch (e) {

        logger.error(e, {
            type:'SYSTEM',
        })

        setTimeout(() => {
            logger.info('Client shutting down.', {
                type: 'SYSTEM',
            })
            process.exit(1)
        }, 500)

    }
}

module.exports = connectDB